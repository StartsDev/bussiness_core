"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintenanceTech = exports.getMaintenances = exports.createMaintenance = void 0;
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
        const maintenances = await (0, maintenance_services_1.getMaintenancesServ)();
        res.status(200).json(maintenances);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getMaintenances = getMaintenances;
// Get All maintenance by tech
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