using System.ComponentModel.DataAnnotations;

namespace StoreAPI.DTO
{
    public class RegisterDto : LoginDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}
