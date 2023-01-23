using AutoMapper;
using StoreAPI.DTO;
using StoreAPI.Entities;
using StoreAPI.Entities.OrderAggregate;

namespace StoreAPI.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();

            //CreateMap<Product, CreateProductDto>()
            //   .ForMember(
            //       dest => dest.File,
            //       opt => opt.MapFrom(src => src.PictureUrl));
        }
    }
}
