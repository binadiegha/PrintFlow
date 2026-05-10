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
        private readonly SettingsService _settingsService;

        public PrintController(LabelService labelService, SettingsService settingsService)
        {
            _labelService = labelService;
            _settingsService = settingsService;
        }

        [HttpPost("print")]
        public IActionResult PrintLabel([FromBody] LabelData data)
        {
            if (data == null)
                return BadRequest("Label data is required.");

            if (string.IsNullOrWhiteSpace(data.Product))
                return BadRequest("Product is required.");

            if (data.MetaData == null)
                return BadRequest("MetaData is required.");

            if (string.IsNullOrWhiteSpace(data.MetaData.Type))
                return BadRequest("MetaData.Type is required.");

            try
            {
                _labelService.ProcessLabel(data);
                return Ok(new { message = "Label printed successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing label: {ex}");
                return StatusCode(500, $"Error processing label: {ex.Message}");
            }
        }

        [HttpGet("settings")]
        public IActionResult GetSettings()
        {
            return Ok(_settingsService.Load());
        }

        [HttpPost("settings")]
        public IActionResult SaveSettings([FromBody] AppSettings settings)
        {
            if (settings == null)
                return BadRequest("Settings are required.");

            _settingsService.Save(settings);
            return Ok(new { message = "Settings saved." });
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("API is working");
        }
    }
}
