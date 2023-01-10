using Microsoft.EntityFrameworkCore;
using StoreAPI.Entities;

namespace StoreAPI.Extensions
{
    public static class BasketExtension
    {
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(b=> b.BuyerId== buyerId);
        }
    }
}
