import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenanceTech,
  getMaintenanceClient,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controllers";
import {
  verifyToken,
  isTech,
  isSuperUser_isAdmin,
  isAdmin_isTech_isSuperU,
} from "../middleware/authjwt";

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

// Update maintenance (tech & admin & super_user)
router.patch(
  "/update-main/:id",
  verifyToken,
  isAdmin_isTech_isSuperU,
  updateMaintenance
);

// Delete maintenance (admin & super_user)
router.delete(
  "/delete-main/:id",
  verifyToken,
  isSuperUser_isAdmin,
  deleteMaintenance
);

export default router;
