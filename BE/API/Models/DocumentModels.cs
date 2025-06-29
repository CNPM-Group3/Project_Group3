using System.ComponentModel.DataAnnotations;
using SRPM.Data.Entities;
namespace SRPM.API.Models
{
    public class ServiceResult<T>
    {
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public string ErrorMessage { get; set; }
        public string Message { get; set; } // 👈 thêm dòng này

        public static ServiceResult<T> Success(T data, string message = null) =>
            new ServiceResult<T> { IsSuccess = true, Data = data, Message = message };

        public static ServiceResult<T> Failure(string errorMessage) =>
            new ServiceResult<T> { IsSuccess = false, ErrorMessage = errorMessage };
    }

    // public class Project
    // {
    //     public int Id { get; set; }
    //     public string Title { get; set; }
    // }

    // public class ResearchTopic
    // {
    //     public int Id { get; set; }
    //     public string Title { get; set; }
    // }

    public class Document
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        
        [StringLength(1000)]
        public string Description { get; set; }
        
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        
        [Required]
        [StringLength(255)]
        public string FilePath { get; set; }
        
        [Required]
        [StringLength(50)]
        public string FileType { get; set; }
        
        public long FileSize { get; set; }
        
        [Required]
        [StringLength(450)]
        public string UploadedBy { get; set; }
        
        public DateTime UploadedAt { get; set; }
        
        public DateTime? UpdatedAt { get; set; }
        
        [StringLength(50)]
        public string Category { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        public virtual ICollection<ProjectDocument> ProjectDocuments { get; set; }
        public virtual ICollection<ResearchTopicDocument> ResearchTopicDocuments { get; set; }
    }

    public class ProjectDocument
    {
        public int ProjectId { get; set; }
        public int DocumentId { get; set; }
        
        public virtual Project Project { get; set; }
        public virtual Document Document { get; set; }
    }

    public class ResearchTopicDocument
    {
        public int ResearchTopicId { get; set; }
        public int DocumentId { get; set; }
        
        public virtual ResearchTopic ResearchTopic { get; set; }
        public virtual Document Document { get; set; }
    }
    public class DocumentUploadDto
    {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public List<int> ProjectIds { get; set; } = new();

        public List<int> ResearchTopicIds { get; set; } = new();
    }

    public class DocumentDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public string UploadedBy { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
        public string FileSizeFormatted { get; set; }
        public List<string> AssociatedProjects { get; set; }
        public List<string> AssociatedResearchTopics { get; set; }
    }

    public class DocumentUpdateDto
    {
        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Category { get; set; }
        
        public List<int> ProjectIds { get; set; } = new List<int>();
        
        public List<int> ResearchTopicIds { get; set; } = new List<int>();
    }
    public class MultipleDocumentUploadDto
    {
        [Required]
        public List<IFormFile> Files { get; set; }

        public List<int> ProjectIds { get; set; } = new();
        public List<int> ResearchTopicIds { get; set; } = new();
        public string DefaultCategory { get; set; }
    }


}
