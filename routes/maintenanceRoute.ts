import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenanceTech,
  getMaintenanceClient,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
} from "../controllers/maintenance.controllers";
import { verifyToken, isTech } from "../middleware/authjwt";

const router = Router();

// Register new Maintenance
router.post("/create-maintenance", verifyToken, isTech, createMaintenance);

// Get all maintenances
router.get("/get-maintenances", getMaintenances);

// Get all maintenance by tech (Dashboard tech services)
router.get("/get-maint-tech", verifyToken, isTech, getMaintenanceTech);

// Get all maintenance by client
router.get("/get-main-client/:customId", getMaintenanceClient);

// Get all maintenance by equipment
router.get("/get-main-equipment/:equipmentId", getMaintenanceEquipment);

// Get one maintenance by id
router.get("/detail-main/:id", getMaintenanceById);

// Update maintenance (tech)
router.patch("/update-main/:id", updateMaintenance);

// Delete maintenance (admin & super_user)
router.delete("/delete-main/:id");

export default router;
