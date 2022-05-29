using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RGP.FingerCounting.Data.DBContext;
using RGP.FingerCounting.Data.EFModels;
using RGP.FingerCounting.Helpers.DM;

namespace RPG.FingerCounting.Domain.Logic.Services
{
    public class RemotesService
    {
        private readonly ApplicationDbContext _ctx;

        public RemotesService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<IEnumerable<RemoteDM>> GetRemotes()
        {
            return await _ctx.Remotes.Select(r => new RemoteDM
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
            }).ToListAsync();
        }

        public async Task<IEnumerable<RemoteDM>> GetRemotesForUser(Guid userId)
        {
            return await _ctx.Remotes.Where(r => r.UserId == userId.ToString()).Select(r => new RemoteDM
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
            }).ToListAsync();
        }
        public async Task<Guid> AddRemote(RemoteDM remote)
        {
            var newRemote = new Remote
            {
                Id = Guid.NewGuid(),
                Name = remote.Name,
                Description = remote.Description,
                UserId = remote.UserID.ToString()
            };
            await _ctx.Remotes.AddAsync(newRemote);
            await _ctx.SaveChangesAsync();
            return newRemote.Id;
        }

        public async Task<bool> DeleteRemote(Guid remoteId)
        {
            var remote = await _ctx.Remotes.FirstOrDefaultAsync(r => r.Id == remoteId);
            if (remote == null)
            {
                return false;
            }
            _ctx.Remotes.Remove(remote);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRemote(RemoteDM remote)
        {
            var remoteToUpdate = await _ctx.Remotes.FirstOrDefaultAsync(r => r.Id == remote.Id);
            if (remoteToUpdate == null)
            {
                return false;
            }
            remoteToUpdate.Name = remote.Name;
            remoteToUpdate.Description = remote.Description;
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRemoteJSONData(Guid remoteId, string remoteData)
        {
            var remoteToUpdate = await _ctx.Remotes.FirstOrDefaultAsync(r => r.Id == remoteId);
            if (remoteToUpdate == null)
            {
                return false;
            }
            remoteToUpdate.RemoteJsonData = remoteData;
            await _ctx.SaveChangesAsync();
            return true;
        }


    }
}
