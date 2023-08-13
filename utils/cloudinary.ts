const cloudinary = require('cloudinary').v2;
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloud = async (filePath:any) => {
  const {secure_url}= await cloudinary.uploader.upload(filePath)
  return secure_url;
/*   return await cloudinary.uploader.upload(filePath, {
    folder: "aires",
  }); */
};

const deleteImage = async (publicId:any) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImageCloud, deleteImage };
