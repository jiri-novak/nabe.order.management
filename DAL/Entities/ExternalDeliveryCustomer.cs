namespace nabe.order.management.DAL.Entities
{
    public class ExternalDeliveryCustomer {
        public int ExternalDeliveryId { get; set; }
        public ExternalDelivery ExternalDelivery { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
