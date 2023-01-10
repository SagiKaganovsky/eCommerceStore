using StoreAPI.Entities.OrderAggregate;

namespace StoreAPI.DTO
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}
