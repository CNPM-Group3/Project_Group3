using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SRPM.API.Models;
using SRPM.API.Services;
using System.Security.Claims;
using Task = System.Threading.Tasks.Task;
using Swashbuckle.AspNetCore.Annotations;

namespace SRPM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FundingRequestsController : ControllerBase
    {
        private readonly IFundingRequestService _fundingRequestService;

        public FundingRequestsController(IFundingRequestService fundingRequestService)
        {
            _fundingRequestService = fundingRequestService;
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Lấy yêu cầu tài trợ theo ID")]
        public async Task<ActionResult<FundingRequestDto>> GetById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            var fundingRequest = await _fundingRequestService.GetByIdAsync(id);
            if (fundingRequest == null)
                return NotFound();

            return Ok(fundingRequest);
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Lấy tất cả yêu cầu tài trợ")]
        public async Task<ActionResult<IEnumerable<FundingRequestDto>>> GetAll()
        {
            var fundingRequests = await _fundingRequestService.GetAllAsync();
            return Ok(fundingRequests);
        }

        [HttpGet("project/{projectId}")]
        [SwaggerOperation(Summary = "Lấy yêu cầu tài trợ theo ID dự án")]
        public async Task<ActionResult<IEnumerable<FundingRequestDto>>> GetByProjectId(int projectId)
        {
            if (projectId <= 0)
                return BadRequest("Invalid Project ID");

            var fundingRequests = await _fundingRequestService.GetByProjectIdAsync(projectId);
            return Ok(fundingRequests);
        }

        [HttpGet("requested-by/{userId}")]
        [SwaggerOperation(Summary = "Lấy yêu cầu tài trợ theo ID người yêu cầu")]
        public async Task<ActionResult<IEnumerable<FundingRequestDto>>> GetByRequestedById(int userId)
        {
            if (userId <= 0)
                return BadRequest("Invalid User ID");

            var fundingRequests = await _fundingRequestService.GetByRequestedByIdAsync(userId);
            return Ok(fundingRequests);
        }

        [HttpGet("status/{status}")]
        [SwaggerOperation(Summary = "Lấy yêu cầu tài trợ theo trạng thái")]
        public async Task<ActionResult<IEnumerable<FundingRequestDto>>> GetByStatus(string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status cannot be empty");

            var fundingRequests = await _fundingRequestService.GetByStatusAsync(status);
            return Ok(fundingRequests);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Tạo yêu cầu tài trợ")]
        public async Task<ActionResult<FundingRequestDto>> Create([FromBody] CreateFundingRequestRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    return BadRequest("Invalid user authentication");

                var fundingRequest = await _fundingRequestService.CreateAsync(request, userId);
                if (fundingRequest == null)
                    return BadRequest("Failed to create funding request. Please check if you have permission to create funding requests for this project.");

                return CreatedAtAction(nameof(GetById), new { id = fundingRequest.Id }, fundingRequest);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating funding request: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Cập nhật yêu cầu tài trợ")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateFundingRequestRequest request)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    return BadRequest("Invalid user authentication");

                var success = await _fundingRequestService.UpdateAsync(id, request, userId);
                if (!success)
                    return BadRequest("Failed to update funding request. Please check if you have permission or if the request is still pending.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating funding request: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Xóa yêu cầu tài trợ")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    return BadRequest("Invalid user authentication");

                var success = await _fundingRequestService.DeleteAsync(id, userId);
                if (!success)
                    return BadRequest("Failed to delete funding request. Please check if you have permission or if the request is still pending.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting funding request: {ex.Message}");
            }
        }

        [HttpPost("{id}/approve")]
        [SwaggerOperation(Summary = "Duyệt yêu cầu cấp kinh phí")]
        [Authorize(Roles = "Staff,Admin")]
        public async Task<ActionResult> Approve(int id, [FromBody] ApproveFundingRequestRequest request)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    return BadRequest("Invalid user authentication");

                var success = await _fundingRequestService.ApproveAsync(id, request, userId);
                if (!success)
                    return BadRequest("Failed to approve funding request. Please check if the request exists and is still pending.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error approving funding request: {ex.Message}");
            }
        }

        [HttpPost("{id}/reject")]
        [SwaggerOperation(Summary = "Từ chối yêu cầu cấp kinh phí")]
        [Authorize(Roles = "Staff,Admin")]
        public async Task<ActionResult> Reject(int id, [FromBody] RejectFundingRequestRequest request)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    return BadRequest("Invalid user authentication");

                var success = await _fundingRequestService.RejectAsync(id, request, userId);
                if (!success)
                    return BadRequest("Failed to reject funding request. Please check if the request exists and is still pending.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error rejecting funding request: {ex.Message}");
            }
        }
    }
}