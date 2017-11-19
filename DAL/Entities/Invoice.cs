using nabe.order.management.Enums;
using System;
using System.Collections.Generic;

namespace nabe.order.management.DAL.Entities
{
    public class Invoice : Entity
    {
        public long? Code { get; set; }
        public DateTime ExpeditionDate { get; set; }
        public ICollection<BillOfDelivery> BillsOfDelivery { get; set; }

        public LaserProgram LaserProgram { get; set; }
        public bool? SentForManufacturing { get; set; }
        public ICollection<ExternalDelivery> ExternalDeliveries { get; set; }
    }
}
