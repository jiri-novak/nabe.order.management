using nabe.order.management.Enums;
using System;
using System.Collections.Generic;

namespace nabe.order.management.DAL.Entities
{
    public class Order : Entity
    {
        public DateTime Date { get; set; }
        public long Code { get; set; }

        public Customer Customer { get; set; }
        public string Description { get; set; }

        public DateTime DeliveryDate { get; set; }

        public Invoice Invoice { get; set; }

        public LaserProgram LaserProgram { get; set; }
        public bool SentForManufacturing { get; set; }

        public ICollection<ExternalDelivery> ExternalDeliveries { get; set; }
    }
}
