using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RGP.FingerCounting.Helpers.DM
{
    public class RemoteDM
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<int> PulsesData { get; set; }
        public Guid UserID { get; set; }
    }
}
