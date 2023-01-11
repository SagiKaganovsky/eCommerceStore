using AutoMapper;
using StoreAPI.DTO;
using StoreAPI.Entities.OrderAggregate;

namespace StoreAPI.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDto>()
                .ForMember(
                    dest => dest.OrderStatus,
                    opt => opt.MapFrom(src => src.OrderStatus.ToString()))
                .ForMember(
                    dest => dest.Total,
                    opt => opt.MapFrom(src => src.GetTotal()));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(
                    dest => dest.ProductId,
                    opt => opt.MapFrom(src => src.ItemOrdered.ProductId))
                .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom(src => src.ItemOrdered.Name))
                .ForMember(
                    dest => dest.PictureUrl,
                    opt => opt.MapFrom(src => src.ItemOrdered.PictureUrl));
        }
    }
}
