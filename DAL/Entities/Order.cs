using System;

namespace nabe.order.management.DAL.Entities
{
    public class Order : Entity
    {
        public DateTime Date { get; set; }
        public long Code { get; set; }
        public Customer Customer { get; set; }
        public string Description { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
