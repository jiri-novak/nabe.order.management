namespace nabe.order.management.DAL.Entities
{
    public class Customer : Entity
    {
        public string Name { get; set; }
        public Company Company { get; set; } 
    }
}
