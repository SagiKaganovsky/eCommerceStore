using System.ComponentModel.DataAnnotations;

namespace StoreAPI.DTO
{
    public class RegisterDto : LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}
