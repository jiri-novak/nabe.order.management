namespace nabe.order.management.DAL.Entities
{
    public class Address
    {
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public int ZipCode { get; set; }
        public string Municipality { get; set; }
        public string State { get; set; }
    }
}
