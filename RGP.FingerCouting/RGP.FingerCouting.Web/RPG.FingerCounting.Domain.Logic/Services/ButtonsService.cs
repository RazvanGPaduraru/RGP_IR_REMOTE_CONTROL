using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using RGP.FingerCounting.Data.DBContext;
using RGP.FingerCounting.Data.EFModels;
using RGP.FingerCounting.Helpers.DM;
using RGP.FingerCounting.Helpers.DTO;

namespace RPG.FingerCounting.Domain.Logic.Services
{
    public class ButtonsService
    { 
        private readonly ApplicationDbContext _ctx;
        private readonly RPYService _rpyService;

        public ButtonsService(ApplicationDbContext ctx, RPYService rpyService)
        {
            _ctx = ctx;
            _rpyService = rpyService;
        }

        public async Task<IEnumerable<ButtonDM>> GetAllButtons()
        {
            var resp =  _ctx.Buttons;
            return await _ctx.Buttons.Select(b => new ButtonDM
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                RemoteId = b.RemoteId,
            }).ToListAsync();
        }
        public async Task<IEnumerable<ButtonDM>> GetAllButtons(Guid remoteId)
        {
            return await _ctx.Buttons.Where(b => b.RemoteId == remoteId).Select(b => new ButtonDM
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                RemoteId = b.RemoteId,
            }).ToListAsync();
        }

        public async Task<ButtonDM?> GetButtonById(Guid id)
        {
            return await _ctx.Buttons.Where(b => b.Id == id).Select(b => new ButtonDM
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                RemoteId = b.RemoteId,
            }).FirstOrDefaultAsync();
        }

        public async Task<Guid> AddButton(ButtonDM button)
        {
            var newButton = new Button
            {
                Id = Guid.NewGuid(),
                Name = button.Name,
                Description = button.Description,
                RemoteId = button.RemoteId,
            };

            _ctx.Buttons.Add(newButton);
            var remote = await _ctx.Remotes.FirstOrDefaultAsync(e => e.Id == button.RemoteId);
            var resp = await _rpyService.AddButton(remote.RemoteJsonData, button.Name);
            remote.RemoteJsonData = resp;
            await _ctx.SaveChangesAsync();

            return newButton.Id;
        }

        public async Task<bool> UpdateButton(ButtonDM button)
        {
            var buttonToUpdate = await _ctx.Buttons.Where(b => b.Id == button.Id).FirstOrDefaultAsync();

            if (buttonToUpdate == null)
            {
                return false;
            }

            buttonToUpdate.Name = button.Name;
            buttonToUpdate.Description = button.Description;
            buttonToUpdate.RemoteId = button.RemoteId;

            await _ctx.SaveChangesAsync();

            return true;
        }
        public async Task<bool> DeleteButton(Guid id)
        {
            var buttonToDelete = await _ctx.Buttons.Where(b => b.Id == id).FirstOrDefaultAsync();

            if (buttonToDelete == null)
            {
                return false;
            }

            _ctx.Buttons.Remove(buttonToDelete);
            await _ctx.SaveChangesAsync();

            return true;
        }



    }
}
