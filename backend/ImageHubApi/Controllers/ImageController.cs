
//
// Patrick Carvalho
// copyright 2022
//

using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;
using ImageHubApi.Repositories;

namespace ImageHub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        public static IWebHostEnvironment _environment;
        public static IUnitOfWork _unitOfWork;        
        public ImageController(IUnitOfWork unitOfWork, IWebHostEnvironment environment)
        {
            _environment = environment;    
            _unitOfWork = unitOfWork;       
        }

        [HttpPost("upload")]
        public async Task<IActionResult> uploadFile([FromForm] IFormFile imageFile)
        {
            //var id_user = this.GetTokenUserId();

            //if (!companyRepo.thisUserIsIncludedInThisCompany(id_user, id_company))
            //    return Unauthorized("You is not included in this company");

            if (imageFile.Length > 0)
            {
                if (!imageFile.ContentType.Contains("image/"))
                    return BadRequest("it's not an image file");

                if (!imageFile.ContentType.Contains("png") && imageFile.ContentType.Contains("jpg") && imageFile.ContentType.Contains("jpeg"))
                    return BadRequest("The image must be png or jpg");

                if (!Directory.Exists(_environment.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\images\\");
                }
                if (!Directory.Exists(_environment.WebRootPath + "\\images\\" ))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\images\\");
                }
                var relativeDir =  "\\" + DateTime.Now.Month;
                var targetDir = _environment.WebRootPath + "\\images" + relativeDir;
                if (!Directory.Exists(targetDir))
                {
                    Directory.CreateDirectory(targetDir);
                }

                var filename = DateTime.Now.ToString("yyyy-MM-ddTHH-mm-ss-fff-tt") + Guid.NewGuid().ToString("D") + ".jpg";
                using (FileStream filestream = new FileStream(targetDir + "\\" + filename, FileMode.Create, FileAccess.Write, FileShare.Write))
                {
                    var image = Image.FromStream(imageFile.OpenReadStream());

                    int width = 512;
                    int height = 512;
                    //é preciso que a proporção seja igual a da imagem de origem, porque senão as fotos ficarão esticadas
                    if (image.Size.Width > image.Size.Height)
                    {
                        float propX = (float)image.Size.Width / (float)image.Size.Height; //1.3
                        width = (int)MathF.Round(512f * propX);
                    }
                    else
                    {
                        float propY = (float)image.Size.Height / (float)image.Size.Width; //1.3
                        height = (int)MathF.Round(512f * propY);
                    }

                    var resized = new Bitmap(image, new Size(width, height));
                    using var imageStream = new MemoryStream();
                    resized.Save(imageStream, ImageFormat.Jpeg);
                    var imageBytes = imageStream.ToArray();
                    filestream.Write(imageBytes, 0, imageBytes.Length);
                    var url = relativeDir + "\\" + filename;
                    url = url.Replace("\\", "/");

                    var transaction = _unitOfWork.BeginTransaction();

                    string query = "insert into imagehub.uploadfile (path_file) values ('.net');";
                    
                    int affectedRows = _unitOfWork.Conexao.Execute(query);
                    transaction.Commit();

                    return Ok(url);
                }

            }
            else
            {
                return BadRequest("Fail to upload file");
            }
        }
    }
}