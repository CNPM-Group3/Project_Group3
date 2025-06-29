using SRPM.Data;
using SRPM.API.Models;
using SRPM.Data.Entities;
using SRPM.Data.Repositories;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using SRPM.Data.Entities;
using Task = System.Threading.Tasks.Task;
using System.IO;
namespace SRPM.API.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<DocumentService> _logger;
        private readonly string[] _allowedExtensions = { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".jpg", ".jpeg", ".png" };
        private const long MaxFileSize = 50 * 1024 * 1024; // 50MB

        public DocumentService(ApplicationDbContext context, IWebHostEnvironment environment, ILogger<DocumentService> logger)
        {
            _context = context;
            _environment = environment;
            _logger = logger;
        }
        public async Task<ServiceResult<DocumentDto>> UploadDocumentAsync(DocumentUploadDto uploadDto, string userId)
{
    var file = uploadDto.File;
    if (file == null)
        return ServiceResult<DocumentDto>.Failure("File không hợp lệ");

    var multiDto = new MultipleDocumentUploadDto
    {
        Files = new List<IFormFile> { file },
        ProjectIds = uploadDto.ProjectIds,
        ResearchTopicIds = uploadDto.ResearchTopicIds,
        DefaultCategory = uploadDto.Category
    };

    var result = await UploadMultipleDocumentsAsync(multiDto, userId);
    if (result.IsSuccess && result.Data?.Any() == true)
        return ServiceResult<DocumentDto>.Success(result.Data.First());

    return ServiceResult<DocumentDto>.Failure(result.ErrorMessage ?? "Tải lên thất bại");
}


        // Phương thức upload nhiều tài liệu cùng lúc
        public async Task<ServiceResult<List<DocumentDto>>> UploadMultipleDocumentsAsync(
    MultipleDocumentUploadDto uploadDto, 
    string userId)
{
    var results = new List<DocumentDto>();
    var errors = new List<string>();

    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
        var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads", "documents");
        if (!Directory.Exists(uploadsPath))
        {
            Directory.CreateDirectory(uploadsPath);
        }

        foreach (var file in uploadDto.Files)
        {
            try
            {
                // Validate file
                var validationResult = ValidateFile(file);
                if (!validationResult.IsSuccess)
                {
                    errors.Add($"{file.FileName}: {validationResult?.ErrorMessage ?? "Không rõ lỗi"}");
                    continue;
                }

                // Unique filename
                var fileExtension = Path.GetExtension(file.FileName);
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(uploadsPath, uniqueFileName);

                // Save file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Tạo Document entity
                var document = new Document
                {
                    Title = Path.GetFileNameWithoutExtension(file.FileName), // không có metadata → dùng tên file
                    Description = "", // không có mô tả riêng
                    FileName = file.FileName,
                    FilePath = Path.Combine("uploads", "documents", uniqueFileName),
                    FileType = fileExtension.TrimStart('.'),
                    FileSize = file.Length,
                    UploadedBy = userId,
                    UploadedAt = DateTime.UtcNow,
                    Category = uploadDto.DefaultCategory,
                    IsActive = true
                };

                _context.Documents.Add(document);
                await _context.SaveChangesAsync();

                // Gán project
                if (uploadDto.ProjectIds?.Any() == true)
                {
                    var projectDocs = uploadDto.ProjectIds.Select(projectId => new ProjectDocument
                    {
                        ProjectId = projectId,
                        DocumentId = document.Id
                    });
                    _context.ProjectDocuments.AddRange(projectDocs);
                }

                // Gán research topic
                if (uploadDto.ResearchTopicIds?.Any() == true)
                {
                    var topicDocs = uploadDto.ResearchTopicIds.Select(topicId => new ResearchTopicDocument
                    {
                        ResearchTopicId = topicId,
                        DocumentId = document.Id
                    });
                    _context.ResearchTopicDocuments.AddRange(topicDocs);
                }

                var documentDto = await MapToDocumentDto(document);
                results.Add(documentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading file {FileName}", file.FileName);
                errors.Add($"{file.FileName}: Có lỗi xảy ra khi upload");
            }
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        if (results.Any())
        {
            var message = $"Upload thành công {results.Count} tài liệu";
            if (errors.Any())
            {
                message += $". {errors.Count} file lỗi: {string.Join("; ", errors.Take(3))}";
                if (errors.Count > 3) message += "...";
            }

            return ServiceResult<List<DocumentDto>>.Success(results, message);
        }
        else
        {
            return ServiceResult<List<DocumentDto>>.Failure($"Không upload được file nào. Lỗi: {string.Join("; ", errors)}");
        }
    }
    catch (Exception ex)
    {
        await transaction.RollbackAsync();
        _logger.LogError(ex, "Error in batch upload");
        return ServiceResult<List<DocumentDto>>.Failure("Có lỗi xảy ra khi upload tài liệu");
    }
}

        public async Task<ServiceResult<DocumentDto>> GetDocumentByIdAsync(int id)
        {
            try
            {
                var document = await _context.Documents
                    .Include(d => d.ProjectDocuments)
                        .ThenInclude(pd => pd.Project)
                    .Include(d => d.ResearchTopicDocuments)
                        .ThenInclude(rtd => rtd.ResearchTopic)
                    .FirstOrDefaultAsync(d => d.Id == id && d.IsActive);

                if (document == null)
                {
                    return ServiceResult<DocumentDto>.Failure("Không tìm thấy tài liệu");
                }

                var documentDto = await MapToDocumentDto(document);
                return ServiceResult<DocumentDto>.Success(documentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting document by id {Id}", id);
                return ServiceResult<DocumentDto>.Failure("Có lỗi xảy ra khi lấy thông tin tài liệu");
            }
        }

        public async Task<ServiceResult<List<DocumentDto>>> GetDocumentsAsync(int pageNumber = 1, int pageSize = 10, string category = null, string searchTerm = null)
        {
            try
            {
                var query = _context.Documents
                    .Include(d => d.ProjectDocuments)
                        .ThenInclude(pd => pd.Project)
                    .Include(d => d.ResearchTopicDocuments)
                        .ThenInclude(rtd => rtd.ResearchTopic)
                    .Where(d => d.IsActive);

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(d => d.Category == category);
                }

                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(d => d.Title.Contains(searchTerm) || 
                                           d.Description.Contains(searchTerm) || 
                                           d.FileName.Contains(searchTerm));
                }

                var documents = await query
                    .OrderByDescending(d => d.UploadedAt)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var documentDtos = new List<DocumentDto>();
                foreach (var document in documents)
                {
                    documentDtos.Add(await MapToDocumentDto(document));
                }

                return ServiceResult<List<DocumentDto>>.Success(documentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting documents");
                return ServiceResult<List<DocumentDto>>.Failure("Có lỗi xảy ra khi lấy danh sách tài liệu");
            }
        }

        public async Task<ServiceResult<DocumentDto>> UpdateDocumentAsync(int id, DocumentUpdateDto updateDto, string userId)
        {
            try
            {
                var document = await _context.Documents
                    .Include(d => d.ProjectDocuments)
                    .Include(d => d.ResearchTopicDocuments)
                    .FirstOrDefaultAsync(d => d.Id == id && d.IsActive);

                if (document == null)
                {
                    return ServiceResult<DocumentDto>.Failure("Không tìm thấy tài liệu");
                }

                // Update document properties
                document.Title = updateDto.Title;
                document.Description = updateDto.Description;
                document.Category = updateDto.Category;
                document.UpdatedAt = DateTime.UtcNow;

                // Update project associations
                _context.ProjectDocuments.RemoveRange(document.ProjectDocuments);
                if (updateDto.ProjectIds?.Any() == true)
                {
                    var projectDocuments = updateDto.ProjectIds.Select(projectId => new ProjectDocument
                    {
                        ProjectId = projectId,
                        DocumentId = document.Id
                    }).ToList();

                    _context.ProjectDocuments.AddRange(projectDocuments);
                }

                // Update research topic associations
                _context.ResearchTopicDocuments.RemoveRange(document.ResearchTopicDocuments);
                if (updateDto.ResearchTopicIds?.Any() == true)
                {
                    var researchTopicDocuments = updateDto.ResearchTopicIds.Select(topicId => new ResearchTopicDocument
                    {
                        ResearchTopicId = topicId,
                        DocumentId = document.Id
                    }).ToList();

                    _context.ResearchTopicDocuments.AddRange(researchTopicDocuments);
                }

                await _context.SaveChangesAsync();

                var documentDto = await MapToDocumentDto(document);
                return ServiceResult<DocumentDto>.Success(documentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating document {Id}", id);
                return ServiceResult<DocumentDto>.Failure("Có lỗi xảy ra khi cập nhật tài liệu");
            }
        }

        public async Task<ServiceResult<bool>> DeleteDocumentAsync(int id, string userId)
        {
            try
            {
                var document = await _context.Documents
                    .FirstOrDefaultAsync(d => d.Id == id && d.IsActive);

                if (document == null)
                {
                    return ServiceResult<bool>.Failure("Không tìm thấy tài liệu");
                }

                // Soft delete
                document.IsActive = false;
                document.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                // Optionally delete physical file
                var fullPath = Path.Combine(_environment.WebRootPath, document.FilePath);
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }

                return ServiceResult<bool>.Success(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting document {Id}", id);
                return ServiceResult<bool>.Failure("Có lỗi xảy ra khi xóa tài liệu");
            }
        }

        public async Task<ServiceResult<List<DocumentDto>>> GetDocumentsByProjectAsync(int projectId)
        {
            try
            {
                var documents = await _context.Documents
                    .Include(d => d.ProjectDocuments)
                        .ThenInclude(pd => pd.Project)
                    .Include(d => d.ResearchTopicDocuments)
                        .ThenInclude(rtd => rtd.ResearchTopic)
                    .Where(d => d.IsActive && d.ProjectDocuments.Any(pd => pd.ProjectId == projectId))
                    .OrderByDescending(d => d.UploadedAt)
                    .ToListAsync();

                var documentDtos = new List<DocumentDto>();
                foreach (var document in documents)
                {
                    documentDtos.Add(await MapToDocumentDto(document));
                }

                return ServiceResult<List<DocumentDto>>.Success(documentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting documents by project {ProjectId}", projectId);
                return ServiceResult<List<DocumentDto>>.Failure("Có lỗi xảy ra khi lấy tài liệu theo dự án");
            }
        }

        public async Task<ServiceResult<List<DocumentDto>>> GetDocumentsByResearchTopicAsync(int researchTopicId)
        {
            try
            {
                var documents = await _context.Documents
                    .Include(d => d.ProjectDocuments)
                        .ThenInclude(pd => pd.Project)
                    .Include(d => d.ResearchTopicDocuments)
                        .ThenInclude(rtd => rtd.ResearchTopic)
                    .Where(d => d.IsActive && d.ResearchTopicDocuments.Any(rtd => rtd.ResearchTopicId == researchTopicId))
                    .OrderByDescending(d => d.UploadedAt)
                    .ToListAsync();

                var documentDtos = new List<DocumentDto>();
                foreach (var document in documents)
                {
                    documentDtos.Add(await MapToDocumentDto(document));
                }

                return ServiceResult<List<DocumentDto>>.Success(documentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting documents by research topic {ResearchTopicId}", researchTopicId);
                return ServiceResult<List<DocumentDto>>.Failure("Có lỗi xảy ra khi lấy tài liệu theo chủ đề nghiên cứu");
            }
        }

        public async Task<ServiceResult<byte[]>> DownloadDocumentAsync(int id, string userId)
        {
            try
            {
                var document = await _context.Documents
                    .FirstOrDefaultAsync(d => d.Id == id && d.IsActive);

                if (document == null)
                {
                    return ServiceResult<byte[]>.Failure("Không tìm thấy tài liệu");
                }

                var fullPath = Path.Combine(_environment.WebRootPath, document.FilePath);
                
                if (!File.Exists(fullPath))
                {
                    return ServiceResult<byte[]>.Failure("File không tồn tại");
                }

                var fileBytes = await File.ReadAllBytesAsync(fullPath);
                return ServiceResult<byte[]>.Success(fileBytes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error downloading document {Id}", id);
                return ServiceResult<byte[]>.Failure("Có lỗi xảy ra khi tải xuống tài liệu");
            }
        }

        private ServiceResult<bool> ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return ServiceResult<bool>.Failure("Vui lòng chọn file");
            }

            if (file.Length > MaxFileSize)
            {
                return ServiceResult<bool>.Failure($"File không được vượt quá {MaxFileSize / (1024 * 1024)}MB");
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!_allowedExtensions.Contains(extension))
            {
                return ServiceResult<bool>.Failure($"Định dạng file không được hỗ trợ. Chỉ chấp nhận: {string.Join(", ", _allowedExtensions)}");
            }

            return ServiceResult<bool>.Success(true);
        }

        private async Task<DocumentDto> MapToDocumentDto(Document document)
        {
            return new DocumentDto
            {
                Id = document.Id,
                Title = document.Title,
                Description = document.Description,
                FileName = document.FileName,
                FileType = document.FileType,
                FileSize = document.FileSize,
                FileSizeFormatted = FormatFileSize(document.FileSize),
                UploadedBy = document.UploadedBy,
                UploadedAt = document.UploadedAt,
                UpdatedAt = document.UpdatedAt,
                Category = document.Category,
                IsActive = document.IsActive,
                AssociatedProjects = document.ProjectDocuments?
                    .Where(pd => pd.Project != null)
                    .Select(pd => pd.Project.Title)
                    .ToList() ?? new List<string>(),

                AssociatedResearchTopics = document.ResearchTopicDocuments?
                    .Where(rtd => rtd.ResearchTopic != null)
                    .Select(rtd => rtd.ResearchTopic.Title)
                    .ToList() ?? new List<string>()
            };
        }


        private string FormatFileSize(long bytes)
        {
            string[] sizes = { "B", "KB", "MB", "GB" };
            double len = bytes;
            int order = 0;
            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len = len / 1024;
            }
            return $"{len:0.##} {sizes[order]}";
        }
    }
}