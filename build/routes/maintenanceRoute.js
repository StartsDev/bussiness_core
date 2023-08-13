"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maintenance_controllers_1 = require("../controllers/maintenance.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new Maintenance
router.post("/create-maintenance", authjwt_1.verifyToken, authjwt_1.isTech, maintenance_controllers_1.createMaintenance);
exports.default = router;
