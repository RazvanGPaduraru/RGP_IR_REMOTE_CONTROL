using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RGP.FingerCounting.Data.Configurations;
using RGP.FingerCounting.Data.EFModels;

namespace RGP.FingerCounting.Data.DBContext
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Remote> Remotes { get; set; }
        public DbSet<Button> Buttons { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ButtonConfiguration());
            builder.ApplyConfiguration(new RemoteConfiguration());
        }
    }
}
