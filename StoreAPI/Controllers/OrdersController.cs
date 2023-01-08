using Micrhosoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.Entities.OrderAggregate;

namespace StoreAPI.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _storeContext;

        public OrdersController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await _storeContext.Orders
                .Include(o => o.OrderItems)
                .Where(u=> u.BuyerId == User.Identity.Name).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            return await _storeContext.Orders
                .Include(o => o.OrderItems)
                .Where( u => u.BuyerId == User.Identity.Name && u.Id == id).FirstOrDefaultAsync();
                
        }
    }
}
