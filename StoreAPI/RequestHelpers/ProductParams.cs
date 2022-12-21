namespace StoreAPI.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string? Types { get; set; }
        public string? OrderBy { get; set; }
        public string? SearchTerm { get; set; }
        public string? Brands { get; set; }
    }
}
