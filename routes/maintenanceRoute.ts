import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenanceUser,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controllers";
import {
  verifyToken,
  validateRolUser,
  isSuperUser_isAdmin,
  isAdmin_isTech_isSuperU,
} from "../middleware/authjwt";

const router = Router();

// Register new Maintenance
router.post("/create-maintenance", verifyToken, validateRolUser, createMaintenance);

// Get all maintenances
router.get("/get-maintenances", getMaintenances);

// Get all maintenance by user (tech - client) (Dashboard tech-client services)
router.get("/get-maint-by-user", verifyToken, validateRolUser, getMaintenanceUser);

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
