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
    public class ButtonConfiguration : IEntityTypeConfiguration<Button>
    {
        public void Configure(EntityTypeBuilder<Button> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasOne<Remote>(s => s.Remote)
                .WithMany(g => g.Buttons)
                .HasForeignKey(s => s.RemoteId);
            builder.Property(e => e.PulsesData).HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList()
            );


        }
    }
}
