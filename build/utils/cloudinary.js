"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary").v2;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageCloud = async (filePath) => {
    const { secure_url } = await cloudinary.uploader.upload(filePath, {
        folder: "aires",
    });
    return secure_url;
};
const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};
module.exports = { uploadImageCloud, deleteImage };
