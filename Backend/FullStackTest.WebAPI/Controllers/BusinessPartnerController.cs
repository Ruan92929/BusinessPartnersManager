using FullStackTest.Application.Services;
using FullStackTest.Domain.Entities.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FullStackTest.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessPartnerController : ControllerBase
    {
        private readonly BusinessPartnerService _service;

        public BusinessPartnerController(BusinessPartnerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPaginated(int page = 1, int pageSize = 5, string filter = "")
        {
            var (businessPartners, totalCount) = await _service.GetAllPaginatedAsync(page, pageSize, filter);
            return Ok(new { data = businessPartners, totalCount });
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{cardCode}")]
        public async Task<IActionResult> GetById(string cardCode)
        {
            var result = await _service.GetByIdAsync(cardCode);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(BusinessPartner businessPartner)
        {
            await _service.AddAsync(businessPartner);
            return CreatedAtAction(nameof(GetById), new { cardCode = businessPartner.CardCode }, businessPartner);
        }


        [HttpPatch("{cardCode}")]
        public async Task<IActionResult> UpdateCardName(string cardCode, [FromBody] string cardName)
        {
            if (string.IsNullOrEmpty(cardName))
                return BadRequest("CardName cannot be null or empty.");

            await _service.UpdateCardNameAsync(cardCode, cardName);
            return NoContent();
        } 

        [HttpDelete("{cardCode}")]
        public async Task<IActionResult> Delete(string cardCode)
        {
            await _service.DeleteAsync(cardCode);
            return NoContent();
        }
    }
}

