"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEquipment = exports.editEquipment = exports.getEquipmentsLocation = exports.getOneEquipment = exports.getAllEquipments = exports.createEquipment = void 0;
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
    const { page, pageSize } = req.query;
    try {
        // const page = parseInt(req.query.page as string) || 1; // Get the requested page from query parameter
        // const pageSize = parseInt(req.query.pageSize as string) || 10; // Get the requested page size from query parameter
        const { equipments, totalCount } = await (0, equipment_services_1.getEquipmentServ)(page, pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);
        res.status(200).json({
            equipments,
            numItmes: totalCount,
            currentPage: parseInt(page),
            totalPages,
        });
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
        const equipmentsLoc = await (0, equipment_services_1.allEquipmentsLocationServ)(req.params.locationId);
        res.status(200).json(equipmentsLoc);
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
