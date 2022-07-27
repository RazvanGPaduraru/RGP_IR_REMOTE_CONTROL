using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RGP.FingerCounting.Data.DBContext;
using RGP.FingerCounting.Helpers.DM;
using RGP.FingerCouting.API.Controllers.Abstract;
using RPG.FingerCounting.Domain.Logic.Services;

namespace RGP.FingerCouting.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class ButtonsController : BaseApiController
    {
        
        private readonly ButtonsService _buttonsService;
        public ButtonsController(ApplicationDbContext ctx, ButtonsService buttonsService) : base(ctx)
        {
            _buttonsService = buttonsService;
        }

        [HttpGet("{remoteId}")]
        public async Task<IEnumerable<ButtonDM>> GetAllButtons(Guid remoteId)
        {
            return await _buttonsService.GetAllButtons(remoteId);
        }
        
        [HttpGet("{id}")]
        public async Task<ButtonDM> GetButtonById(Guid id)
        {
            return await _buttonsService.GetButtonById(id);
        }
        [HttpPost]
        public async Task<IActionResult> CreateButton([FromBody] ButtonDM button)
        {
            if (button == null)
            {
                return BadRequest();
            }
            var result = await _buttonsService.AddButton(button);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<string> PressButton(Guid id)
        {
            return await _buttonsService.PushButton(id);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateButton([FromBody] ButtonDM button)
        {
            if (button == null)
            {
                return BadRequest();
            }
            var result = await _buttonsService.UpdateButton(button);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteButton(Guid id)
        {
            var result = await _buttonsService.DeleteButton(id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        


    }
}
