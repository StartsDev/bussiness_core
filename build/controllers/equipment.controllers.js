"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreate = exports.deleteEquipment = exports.editEquipment = exports.getEquipmentsLocation = exports.getOneEquipment = exports.getAllEquipments = exports.createEquipment = void 0;
const equipment_services_1 = require("../services/equipment.services");
//Register new equipment
const createEquipment = async (req, res) => {
    try {
        const equipment = await (0, equipment_services_1.newEquipmentServ)(req.body);
        res.status(200).json(equipment);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.createEquipment = createEquipment;
//Get All Equipments
const getAllEquipments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const name = req.query.name || undefined;
        const serial = req.query.serial || undefined;
        const model = req.query.model || undefined;
        const type = req.query.type || undefined;
        const brand = req.query.brand || undefined;
        const locationName = req.query.locationName || undefined;
        const headName = req.query.headName || undefined;
        const businessName = req.query.businessName || undefined;
        if (page && pageSize) {
            const { equipments, totalCount, totalPages } = await (0, equipment_services_1.getEquipmentServPag)(name, serial, model, type, brand, page, pageSize, locationName, headName, businessName);
            res.status(200).json({
                equipments,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
        // if (pageSize) {
        //   res.status(400).json({
        //     msg: "Tiene que haber un número de página...",
        //   });
        // }
        // if (page) {
        //   res.status(400).json({
        //     msg: "Debe indicar el número de items por página...",
        //   });
        // }
        if (!page && !pageSize) {
            const { equipments, totalCount } = await (0, equipment_services_1.getEquipmentServ)(name, serial, model, type, brand, locationName, headName, businessName);
            res.status(200).json({
                equipments,
                numItmes: totalCount,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getAllEquipments = getAllEquipments;
//Get One Equipment
const getOneEquipment = async (req, res) => {
    try {
        const equipment = await (0, equipment_services_1.getOneEquipmentServ)(req.params.id);
        res.status(200).json(equipment);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getOneEquipment = getOneEquipment;
//Get equipments by location
const getEquipmentsLocation = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { equipLocation, totalCount, totalPages } = await (0, equipment_services_1.allEquipmentsLocationServ)(req.params.locationId, page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                equipLocation,
                numItmes: totalCount,
            });
        }
        if (page && pageSize) {
            res.status(200).json({
                equipLocation,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
        if (pageSize) {
            res.status(400).json({
                msg: "Tiene que haber un número de página...",
            });
        }
        if (page) {
            res.status(400).json({
                msg: "Debe indicar el número de items por página...",
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getEquipmentsLocation = getEquipmentsLocation;
// Update equipment
const editEquipment = async (req, res) => {
    try {
        const equipment = await (0, equipment_services_1.updateEquipmentServ)(req.params.id, req.body);
        res.status(200).json(equipment);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.editEquipment = editEquipment;
//Delete equipment
const deleteEquipment = async (req, res) => {
    try {
        const equipment = await (0, equipment_services_1.deleteEquipmentServ)(req.params.id);
        res.status(200).json(equipment);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.deleteEquipment = deleteEquipment;
const bulkCreate = async (req, res) => {
    try {
        const equipments = await (0, equipment_services_1.bulkCreateEquipments)(req.body);
        res.status(200).json(equipments);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.bulkCreate = bulkCreate;
