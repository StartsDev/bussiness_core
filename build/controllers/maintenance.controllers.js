"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenance = exports.updateMaintenance = exports.getMaintenanceById = exports.getMaintenanceEquipment = exports.getMaintenanceUser = exports.getMaintenances = exports.createMaintenance = void 0;
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
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { maintenances, totalCount } = await (0, maintenance_services_1.getMaintenancesServ)(page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                maintenances,
                numItmes: totalCount,
            });
        }
        else {
            const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
            res.status(200).json({
                maintenances,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenances = getMaintenances;
// Get all maintenances by user (tech-clients) (home)
const getMaintenanceUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { maintenanceUser, totalCount } = await (0, maintenance_services_1.getMaintByUserServ)(req.body, page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                maintenanceUser,
                numItmes: totalCount,
            });
        }
        else {
            if (totalCount) {
                const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
                res.status(200).json({
                    maintenanceUser,
                    numItmes: totalCount,
                    currentPage: page,
                    totalPages,
                });
            }
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenanceUser = getMaintenanceUser;
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
        const id = parseInt(req.params.id);
        const maintenance = await (0, maintenance_services_1.updateMaintenanceServ)(id, req.body);
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
