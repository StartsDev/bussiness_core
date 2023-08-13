"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipment_controllers_1 = require("../controllers/equipment.controllers");
const router = (0, express_1.Router)();
// Register new equipment
router.post("/create-equipment", equipment_controllers_1.createEquipment);
// Get all equipments
router.get("/get-all-equipments", equipment_controllers_1.getAllEquipments);
// Get one equipment
router.get("/get-equipment/:id", equipment_controllers_1.getOneEquipment);
// Get equipments by location
router.get("/get-all-equipments-location/:locationId", equipment_controllers_1.getEquipmentsLocation);
// Update equipment
router.patch("/update-equipment/:id", equipment_controllers_1.editEquipment);
// Delete equipment
router.delete("/delete-equipment/:id", equipment_controllers_1.deleteEquipment);
exports.default = router;
