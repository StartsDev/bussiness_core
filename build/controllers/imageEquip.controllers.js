"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upImgEquip = void 0;
const imageEquip_services_1 = require("../services/imageEquip.services");
const { uploadImageCloud } = require("../utils/cloudinary");
const upImgEquip = async (req, res) => {
    try {
        const { tempFilePath } = req.files.picture;
        const { id } = req.params;
        const secure_url = await uploadImageCloud(tempFilePath);
        const response = await (0, imageEquip_services_1.uploadImageServ)(secure_url, id);
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.upImgEquip = upImgEquip;
