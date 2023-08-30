"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maintenance_controllers_1 = require("../controllers/maintenance.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new Maintenance
router.post("/create-maintenance", authjwt_1.verifyToken, authjwt_1.validateRolUser, maintenance_controllers_1.createMaintenance);
// Get all maintenances
router.get("/get-maintenances", maintenance_controllers_1.getMaintenances);
// Get all maintenance by user (tech - client) (Dashboard tech-client services)
router.get("/get-maint-by-user", authjwt_1.verifyToken, authjwt_1.validateRolUser, maintenance_controllers_1.getMaintenanceUser);
// Get all maintenance by equipment
router.get("/get-main-equipment/:equipmentId", maintenance_controllers_1.getMaintenanceEquipment);
// Get one maintenance by id
router.get("/detail-main/:id", maintenance_controllers_1.getMaintenanceById);
// Update maintenance (tech & admin & super_user)
router.patch("/update-main/:id", authjwt_1.verifyToken, authjwt_1.isAdmin_isTech_isSuperU, maintenance_controllers_1.updateMaintenance);
// Delete maintenance (admin & super_user)
router.delete("/delete-main/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, maintenance_controllers_1.deleteMaintenance);
exports.default = router;
