using System.ComponentModel.DataAnnotations;

namespace SRPM.API.Models
{
    public class FundingRequestDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Purpose { get; set; }
        public string? JustificationDocumentUrl { get; set; }
        public int ProjectId { get; set; }
        public string? ProjectTitle { get; set; }
        public int RequestedById { get; set; }
        public string? RequestedByName { get; set; }
        public int? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateFundingRequestRequest
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }

        [StringLength(500, ErrorMessage = "Purpose cannot exceed 500 characters")]
        public string? Purpose { get; set; }

        [Url(ErrorMessage = "Invalid URL format")]
        public string? JustificationDocumentUrl { get; set; }

        [Required(ErrorMessage = "ProjectId is required")]
        [Range(1, int.MaxValue, ErrorMessage = "ProjectId must be greater than 0")]
        public int ProjectId { get; set; }
    }

    public class UpdateFundingRequestRequest
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }

        [StringLength(500, ErrorMessage = "Purpose cannot exceed 500 characters")]
        public string? Purpose { get; set; }

        [Url(ErrorMessage = "Invalid URL format")]
        public string? JustificationDocumentUrl { get; set; }
    }

    public class ApproveFundingRequestRequest
    {
        public string? Note { get; set; }
    }

    public class RejectFundingRequestRequest
    {
        [Required(ErrorMessage = "Reason is required")]
        [StringLength(500, ErrorMessage = "Reason cannot exceed 500 characters")]
        public string Reason { get; set; } = string.Empty;
    }
}