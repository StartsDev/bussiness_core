import { Router } from "express";
import {
  createEquipment,
  getAllEquipments,
  getOneEquipment,
  getEquipmentsLocation,
  editEquipment,
  deleteEquipment,
} from "../controllers/equipment.controllers";

const router = Router();

// Register new equipment
router.post("/create-equipment", createEquipment);

// Get all equipments
router.get("/get-all-equipments", getAllEquipments);

// Get one equipment
router.get("/get-equipment/:id", getOneEquipment);

// Get equipments by location
router.get("/get-all-equipments-location/:locationId", getEquipmentsLocation);

// Update equipment
router.patch("/update-equipment/:id", editEquipment);

// Delete equipment
router.delete("/delete-equipment/:id", deleteEquipment);

export default router;
