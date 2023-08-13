const cloudinary = require('cloudinary').v2;
//import dotenv from "dotenv";
//dotenv.config();
CLOUDINARY_CLOUD_NAME = "orlandogvk"
CLOUDINARY_API_KEY = "986164459442979"
CLOUDINARY_API_SECRET = "vnDh4v0pJcCg2-1iKXuMvK_LTCE"

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadImageCloud = async (filePath) => {
  const {secure_url}= await cloudinary.uploader.upload(filePath)
  return secure_url;
/*   return await cloudinary.uploader.upload(filePath, {
    folder: "aires",
  }); */
};

const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImageCloud, deleteImage };
