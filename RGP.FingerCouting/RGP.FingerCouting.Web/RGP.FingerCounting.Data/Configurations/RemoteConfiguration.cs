using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RGP.FingerCounting.Data.EFModels;

namespace RGP.FingerCounting.Data.Configurations
{
    public class RemoteConfiguration : IEntityTypeConfiguration<Remote>
    {
        public void Configure(EntityTypeBuilder<Remote> builder)
        {
            builder.HasKey(r => r.Id);
            
            
        }
    }
}
