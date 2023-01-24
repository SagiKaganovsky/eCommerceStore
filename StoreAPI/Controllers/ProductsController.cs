using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Data;
using StoreAPI.DTO;
using StoreAPI.Entities;
using StoreAPI.Extensions;
using StoreAPI.RequestHelpers;
using StoreAPI.Services;
using System.Text.Json;

namespace StoreAPI.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext storeContext, IMapper mapper, ImageService imageService)
        {
            _storeContext = storeContext;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProductsAsync([FromQuery] ProductParams productParams)
        {
            var query = _storeContext.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types).AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber,
                productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null) { return NotFound(); }
            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilers()
        {
            var brands = await _storeContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _storeContext.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost(Name = "CreateProduct")]
        public async Task<ActionResult<Product>> CreateProductAsync([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }
                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _storeContext.Products.Add(product);
            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(product);
            }

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto updateProductDto)
        {
            var product = await _storeContext.Products.FindAsync(updateProductDto.Id);
            if (product == null)
            {
                return NotFound();
            }
            _mapper.Map(updateProductDto, product);

            if (updateProductDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateProductDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }
                if (!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }
                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result) { return Ok(product); }

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {

            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await _imageService.DeleteImageAsync(product.PublicId);
            }

            _storeContext.Products.Remove(product);

            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(result);
            }

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });

        }
    }
}
