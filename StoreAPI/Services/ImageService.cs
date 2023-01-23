using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace StoreAPI.Services
{
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService(IConfiguration configuration)
        {
            var account = new Account(
                configuration["Cloudinary:CloudName"],
                 configuration["Cloudinary:ApiKey"],
                 configuration["Cloudinary:ApiSecret"]);

            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddImageAsync(IFormFile formFile)
        {
            var uploadResult = new ImageUploadResult();
            if (formFile != null)
            {
                using var stream = formFile.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(formFile.FileName, stream)
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;

        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}
