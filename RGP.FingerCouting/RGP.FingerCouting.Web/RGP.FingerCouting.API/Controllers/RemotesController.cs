using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RGP.FingerCounting.Data.DBContext;
using RGP.FingerCounting.Helpers.DM;
using RGP.FingerCounting.Helpers.DTO;
using RGP.FingerCouting.API.Controllers.Abstract;
using RPG.FingerCounting.Domain.Logic.Services;

namespace RGP.FingerCouting.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class RemotesController : BaseApiController
    {
        private readonly RemotesService _remotesService;
        private readonly RPYService _rpyService;
        private readonly ILogger<RemotesController> _logger;
        public RemotesController(RemotesService remotesService, ApplicationDbContext ctx, RPYService rpyService, ILogger<RemotesController> logger) : base(ctx)
        {
            _remotesService = remotesService;
            _rpyService = rpyService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<RemoteDM>> GetAllRemotes()
        {
            return await _remotesService.GetRemotesForUser(CurrentUserID);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRemote(RemoteModelDTO model)
        {
            if (ModelState.IsValid)
            {
                var remoteId = await _remotesService.AddRemote(new RemoteDM()
                {
                    Name = model.Name,
                    UserID = CurrentUserID,
                    Description = model.Description
                });
                var resp = await _rpyService.AddRemote(model.Name, model.Description != null ? model.Description : "");
                await _remotesService.UpdateRemoteJSONData(remoteId, resp);
                _logger.LogInformation(resp);
                return Ok(remoteId);
            }

            
            
            return BadRequest();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRemote(Guid id)
        {
            if (ModelState.IsValid)
            {
                await _remotesService.DeleteRemote(id);
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateRemote(RemoteModelDTO model)
        {
            if (ModelState.IsValid)
            {
                await _remotesService.UpdateRemote(new RemoteDM()
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description
                });
                return Ok();
            }
            return BadRequest();
        }
    }
}
