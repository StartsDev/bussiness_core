"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const Maintenance = require("../models/maintenance");
const uploadImage = async (image, id) => {
    try {
        let idParsed = parseInt(id);
        const findMaintenance = await Maintenance.findOne({
            where: { id: id }
        });
        if (!findMaintenance) {
            return {
                msg: "Servicio no encontrado",
                success: false
            };
        }
        const photoArray = findMaintenance.dataValues.photos;
        photoArray.push(image);
        await Maintenance.update({ photos: photoArray }, {
            where: { id: idParsed }
        });
        return {
            msg: "Servicio actualizado",
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.uploadImage = uploadImage;
