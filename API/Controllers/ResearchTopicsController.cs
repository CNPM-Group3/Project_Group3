using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SRPM.API.Models;
using SRPM.API.Services;
using System.Security.Claims;
using Task = System.Threading.Tasks.Task;

namespace SRPM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ResearchTopicsController : ControllerBase
    {
        private readonly IResearchTopicService _researchTopicService;

        public ResearchTopicsController(IResearchTopicService researchTopicService)
        {
            _researchTopicService = researchTopicService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResearchTopicDto>> GetById(int id)
        {
            var researchTopic = await _researchTopicService.GetByIdAsync(id);
            if (researchTopic == null)
                return NotFound();

            return Ok(researchTopic);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResearchTopicDto>>> GetAll()
        {
            var researchTopics = await _researchTopicService.GetAllAsync();
            return Ok(researchTopics);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<ResearchTopicDto>>> GetActive()
        {
            var researchTopics = await _researchTopicService.GetActiveAsync();
            return Ok(researchTopics);
        }

