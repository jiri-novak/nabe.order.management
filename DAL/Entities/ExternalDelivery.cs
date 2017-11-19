using nabe.order.management.Enums;
using System.Collections.Generic;

namespace nabe.order.management.DAL.Entities
{
    public class ExternalDelivery : Entity
    {
        public string Description { get; set; }
        public string Comments { get; set; }
        public ICollection<Customer> Customers { get; set; }
        public State State { get; set; }
    }
}
