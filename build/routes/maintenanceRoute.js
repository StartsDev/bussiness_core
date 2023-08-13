"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maintenance_controllers_1 = require("../controllers/maintenance.controllers");
const router = (0, express_1.Router)();
// Register new Maintenance
//router.post("/create-maintenance", verifyToken, isTech, createMaintenance);
router.post("/create-maintenance", maintenance_controllers_1.createMaintenance);
exports.default = router;
