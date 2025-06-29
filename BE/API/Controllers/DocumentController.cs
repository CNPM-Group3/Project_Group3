using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRPM.API.Models;
using SRPM.API.Services;
using SRPM.Data.Entities;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace SRPM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly ILogger<DocumentController> _logger;

        public DocumentController(IDocumentService documentService, ILogger<DocumentController> logger)
        {
            _documentService = documentService;
            _logger = logger;
        }
        [HttpPost("upload-multiple")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadMultipleDocuments([FromForm] MultipleDocumentUploadDto uploadDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var result = await _documentService.UploadMultipleDocumentsAsync(uploadDto, userId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data, message = $"Tải lên thành công {result.Data.Count} tài liệu" });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromForm] DocumentUploadDto uploadDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _documentService.UploadDocumentAsync(uploadDto, userId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data, message = "Tải lên tài liệu thành công" });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocument(int id)
        {
            var result = await _documentService.GetDocumentByIdAsync(id);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data });
            }

            return NotFound(new { success = false, message = result.ErrorMessage });
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string category = null, [FromQuery] string searchTerm = null)
        {
            var result = await _documentService.GetDocumentsAsync(pageNumber, pageSize, category, searchTerm);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDocument(int id, [FromBody] DocumentUpdateDto updateDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _documentService.UpdateDocumentAsync(id, updateDto, userId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data, message = "Cập nhật tài liệu thành công" });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var documentResult = await _documentService.GetDocumentByIdAsync(id);
            if (!documentResult.IsSuccess)
            {
                return NotFound(new { success = false, message = documentResult.ErrorMessage });
            }

            var downloadResult = await _documentService.DownloadDocumentAsync(id, userId);
            if (!downloadResult.IsSuccess)
            {
                return BadRequest(new { success = false, message = downloadResult.ErrorMessage });
            }

            var document = documentResult.Data;
            var contentType = GetContentType(document.FileType);
            
            return File(downloadResult.Data, contentType, document.FileName);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _documentService.DeleteDocumentAsync(id, userId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, message = "Xóa tài liệu thành công" });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetDocumentsByProject(int projectId)
        {
            var result = await _documentService.GetDocumentsByProjectAsync(projectId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        [HttpGet("research-topic/{researchTopicId}")]
        public async Task<IActionResult> GetDocumentsByResearchTopic(int researchTopicId)
        {
            var result = await _documentService.GetDocumentsByResearchTopicAsync(researchTopicId);
            
            if (result.IsSuccess)
            {
                return Ok(new { success = true, data = result.Data });
            }

            return BadRequest(new { success = false, message = result.ErrorMessage });
        }

        private string GetContentType(string fileExtension)
        {
            return fileExtension.ToLowerInvariant() switch
            {
                "pdf" => "application/pdf",
                "doc" => "application/msword",
                "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "xls" => "application/vnd.ms-excel",
                "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "ppt" => "application/vnd.ms-powerpoint",
                "pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "txt" => "text/plain",
                "jpg" or "jpeg" => "image/jpeg",
                "png" => "image/png",
                _ => "application/octet-stream"
            };
        }
    }
}