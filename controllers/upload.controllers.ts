import { Request, Response } from "express";
import { uploadImage } from "../services/image.services";

const { uploadImageCloud } = require("../utils/cloudinary.js");

const uploadControllerImg = async (req: any, res: Response) => {
  try {
    const { tempFilePath } = req.files.picture;
    const { id } = req.params;
    const secure_url = await uploadImageCloud(tempFilePath);
    const response = await uploadImage(secure_url, id);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export { uploadControllerImg };
