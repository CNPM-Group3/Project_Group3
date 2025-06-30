// using System;
// using System.ComponentModel.DataAnnotations;

// namespace SRPM.Data.Entities
// {
//     public class Document
//     {
//         [Key]
//         public Guid Id { get; set; }
        
//         [Required]
//         public int ProjectId { get; set; }
        
//         [Required]
//         [MaxLength(255)]
//         public string FileName { get; set; }
        
//         [Required]
//         [MaxLength(255)]
//         public string StoredFileName { get; set; }
        
//         [Required]
//         [MaxLength(500)]
//         public string FilePath { get; set; }
        
//         public long FileSize { get; set; }
        
//         [MaxLength(100)]
//         public string ContentType { get; set; }
        
//         [MaxLength(1000)]
//         public string Description { get; set; }
        
//         [Required]
//         [MaxLength(255)]
//         public string UploadedBy { get; set; }
        
//         public DateTime UploadedAt { get; set; }
        
//         public bool IsActive { get; set; } = true;
        
//         // Navigation property
//         public Project Project { get; set; } = null!;
//     }
// }