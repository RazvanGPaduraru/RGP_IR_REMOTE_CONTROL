using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RGP.FingerCounting.Data.EFModels
{
    public class Button
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid RemoteId { get; set; }
        public List<int>? PulsesData { get; set; }
        public virtual Remote Remote { get; set; }
    }
}
