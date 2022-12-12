using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.DTO;
using StoreAPI.Entities;

namespace StoreAPI.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        private readonly IMapper _mapper;

        public BasketController(StoreContext storeContext, IMapper mapper)
        {
            _storeContext = storeContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) { return NotFound(); }

            return Ok(_mapper.Map<BasketDto>(basket));
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantiry)
        {
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                basket = CreateBasket();
            }
            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }
            basket.AddItem(product, quantiry);

            var result = await _storeContext.SaveChangesAsync() > 0;
            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
            }
            return Ok();
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveItemToBasket(int productId, int quantiry)
        {
            return Ok();
        }
        private async Task<Basket> RetrieveBasket()
        {
            return await _storeContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _storeContext.Baskets.Add(basket);
            return basket;
        }
    }
}
