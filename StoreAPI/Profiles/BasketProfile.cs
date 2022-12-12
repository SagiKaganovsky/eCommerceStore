using AutoMapper;
using StoreAPI.DTO;
using StoreAPI.Entities;

namespace StoreAPI.Profiles
{
    public class BasketProfile : Profile
    {
        public BasketProfile()
        {
            CreateMap<Basket, BasketDto>();
            CreateMap<BasketItem, BasketItemDto>()
                .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest =>
                    dest.Price,
                    opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(dest =>
                    dest.PictureUrl,
                    opt => opt.MapFrom(src => src.Product.PictureUrl))
                .ForMember(dest =>
                    dest.Brand,
                    opt => opt.MapFrom(src => src.Product.Brand))
                .ForMember(dest =>
                    dest.Type,
                    opt => opt.MapFrom(src => src.Product.Type));
        }
    }
}
