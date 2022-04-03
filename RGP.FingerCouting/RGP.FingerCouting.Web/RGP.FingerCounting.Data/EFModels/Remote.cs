namespace RGP.FingerCounting.Data.EFModels
{
    public class Remote
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Button>? Buttons { get; set; }


    }
}

