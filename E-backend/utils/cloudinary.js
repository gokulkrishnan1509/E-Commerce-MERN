const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (results) => {
      resolve(
        {
          url: results.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports=cloudinaryUploadImg