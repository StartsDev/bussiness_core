"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadControllerImg = void 0;
const image_services_1 = require("../services/image.services");
const { uploadImageCloud } = require("../utils/cloudinary");
const uploadControllerImg = async (req, res) => {
    try {
        const { tempFilePath } = req.files.picture;
        const { id } = req.params;
        const secure_url = await uploadImageCloud(tempFilePath);
        const response = await (0, image_services_1.uploadImage)(secure_url, id);
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.uploadControllerImg = uploadControllerImg;
