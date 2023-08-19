"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenance = exports.updateMaintenance = exports.getMaintenanceById = exports.getMaintenanceEquipment = exports.getMaintenanceClient = exports.getMaintenanceTech = exports.getMaintenances = exports.createMaintenance = void 0;
const maintenance_services_1 = require("../services/maintenance.services");
//Register new maintenance
const createMaintenance = async (req, res) => {
    try {
        const maintenance = await (0, maintenance_services_1.createMaintenanceServ)(req.body);
        res.status(200).json(maintenance);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.createMaintenance = createMaintenance;
// Get all maintenances
const getMaintenances = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || 10; // Get the requested page size from query parameter
        const { maintenances, totalCount } = await (0, maintenance_services_1.getMaintenancesServ)(page, pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);
        res.status(200).json({
            maintenances,
            numItmes: totalCount,
            currentPage: page,
            totalPages,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenances = getMaintenances;
// Get all maintenances by tech
const getMaintenanceTech = async (req, res) => {
    try {
        const maintech = await (0, maintenance_services_1.getMaintByTechServ)(req.body);
        res.status(200).json(maintech);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenanceTech = getMaintenanceTech;
// Get all maintenances by client
const getMaintenanceClient = async (req, res) => {
    try {
        const maintclient = await (0, maintenance_services_1.getMaintByClientServ)(req.params);
        res.status(200).json(maintclient);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenanceClient = getMaintenanceClient;
// Get all maintenances by equipment
const getMaintenanceEquipment = async (req, res) => {
    try {
        const maintequip = await (0, maintenance_services_1.getMainByEquipment)(req.params);
        res.status(200).json(maintequip);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenanceEquipment = getMaintenanceEquipment;
// Get one maintenance by Id
const getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await (0, maintenance_services_1.getMaintByIdServ)(req.params);
        res.status(200).json(maintenance);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenanceById = getMaintenanceById;
// Update maintenance
const updateMaintenance = async (req, res) => {
    try {
        const maintenance = await (0, maintenance_services_1.updateMaintenanceServ)(req.params.id, req.body);
        res.status(201).json(maintenance);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.updateMaintenance = updateMaintenance;
// Delete maintenance
const deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await (0, maintenance_services_1.deleteMaintenanceServ)(req.params.id);
        res.status(200).json(maintenance);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.deleteMaintenance = deleteMaintenance;
