using Microsoft.AspNetCore.Mvc;
using DzinerProgram.Models;
using DzinerProgram.Services;

namespace DzinerProgram.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrintController : ControllerBase
    {
        private readonly LabelService _labelService;

        public PrintController(LabelService labelService)
        {
            _labelService = labelService;
        }

        [HttpPost("print")]
        public IActionResult PrintLabel([FromBody] LabelData data)
        {
            try
            {
                _labelService.ProcessLabel(data);
                return Ok("Label printed successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error printing label: {ex.Message}");
            }
        }
    }
}
