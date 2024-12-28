using FullStackTest.Application.Services;
using FullStackTest.Domain.Entities.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using System.Linq;

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
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 5, string filter = "")
        {
            try
            {
                var (businessPartners, totalCount) = await _service.GetAllAsync(page, pageSize, filter);
                return Ok(new { data = businessPartners, totalCount });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { erros = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Ocorreu um erro inesperado.", detalhes = ex.Message });
            }
        }

        [HttpGet("{cardCode}")]
        public async Task<IActionResult> GetById(string cardCode)
        {
            try
            {
                var result = await _service.GetByIdAsync(cardCode);
                if (result == null)
                {
                    return NotFound(new { erro = "Parceiro de negócios não encontrado." });
                }
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { erros = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Ocorreu um erro inesperado.", detalhes = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(BusinessPartner businessPartner)
        {
            try
            {
                await _service.AddAsync(businessPartner);
                return StatusCode(201, businessPartner);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { erros = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Ocorreu um erro inesperado.", detalhes = ex.Message });
            }
        }

        [HttpPatch("{cardCode}")]
        public async Task<IActionResult> UpdateCardName(string cardCode, [FromBody] string cardName)
        {
            try
            {
                await _service.UpdateCardNameAsync(cardCode, cardName);
                return NoContent();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { erros = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Ocorreu um erro inesperado.", detalhes = ex.Message });
            }
        }

        [HttpDelete("{cardCode}")]
        public async Task<IActionResult> Delete(string cardCode)
        {
            try
            {
                await _service.DeleteAsync(cardCode);
                return NoContent();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { erros = ex.Errors.Select(e => e.ErrorMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Ocorreu um erro inesperado.", detalhes = ex.Message });
            }
        }
    }
}
