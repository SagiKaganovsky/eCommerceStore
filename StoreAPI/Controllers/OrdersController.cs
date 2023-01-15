using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.DTO;
using StoreAPI.Entities;
using StoreAPI.Entities.OrderAggregate;
using StoreAPI.Extensions;

namespace StoreAPI.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        private readonly IMapper _mapper;

        public OrdersController(StoreContext storeContext, IMapper mapper)
        {
            _storeContext = storeContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            var orders = await _storeContext.Orders
                .Include(o => o.OrderItems)
                .Where(u => u.BuyerId == User.Identity.Name).ToListAsync();
            return _mapper.Map<List<OrderDto>>(orders);
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _storeContext.Orders
                .Include(o => o.OrderItems)
                .Where(u => u.BuyerId == User.Identity.Name && u.Id == id).FirstOrDefaultAsync();

            return _mapper.Map<OrderDto>(order);

        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var basket = await _storeContext.Baskets.RetrieveBasketWithItems(User.Identity.Name).FirstOrDefaultAsync();

            if (basket == null)
            {
                return BadRequest(new ProblemDetails() { Title = "Could not locate basket" });
            }

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _storeContext.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);

                productItem.QuantityInStock -= item.Quantity;
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 1000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = createOrderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
            };
            _storeContext.Orders.Add(order);
            _storeContext.Baskets.Remove(basket);

            if (createOrderDto.SaveAddress)
            {
                var user = await _storeContext.Users.Include(a => a.Address).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                user.Address = new UserAddress
                {
                    FullName = createOrderDto.ShippingAddress.FullName,
                    AddressOne = createOrderDto.ShippingAddress.AddressOne,
                    AddressTwo = createOrderDto.ShippingAddress.AddressTwo,
                    City = createOrderDto.ShippingAddress.City,
                    State = createOrderDto.ShippingAddress.State,
                    PostalCode = createOrderDto.ShippingAddress.PostalCode,
                    Country = createOrderDto.ShippingAddress.Country,
                };
                _storeContext.Update(user);
            }
            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
            }

            return BadRequest("Problem creating order");
        }

    }
}
