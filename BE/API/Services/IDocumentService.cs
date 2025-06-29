using System;
using System.Collections.Generic;
using Task = System.Threading.Tasks.Task;
using SRPM.API.Models; // hoặc đúng namespace chứa Document

namespace SRPM.API.Services
{
    public interface IDocumentService
    {
        Task<ServiceResult<List<DocumentDto>>> UploadMultipleDocumentsAsync(MultipleDocumentUploadDto uploadDto, string userId);
        Task<ServiceResult<DocumentDto>> UploadDocumentAsync(DocumentUploadDto uploadDto, string userId);

        Task<ServiceResult<DocumentDto>> GetDocumentByIdAsync(int id);
        Task<ServiceResult<List<DocumentDto>>> GetDocumentsAsync(int pageNumber = 1, int pageSize = 10, string category = null, string searchTerm = null);
        Task<ServiceResult<DocumentDto>> UpdateDocumentAsync(int id, DocumentUpdateDto updateDto, string userId);
        Task<ServiceResult<bool>> DeleteDocumentAsync(int id, string userId);
        Task<ServiceResult<byte[]>> DownloadDocumentAsync(int id, string userId);
        Task<ServiceResult<List<DocumentDto>>> GetDocumentsByProjectAsync(int projectId);
        Task<ServiceResult<List<DocumentDto>>> GetDocumentsByResearchTopicAsync(int researchTopicId);
    }
}
