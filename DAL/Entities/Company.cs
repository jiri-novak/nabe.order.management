namespace nabe.order.management.DAL.Entities
{
    public class Company : Entity
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public string DIC { get; set; }
        public long ICO { get; set; }
    }
}
