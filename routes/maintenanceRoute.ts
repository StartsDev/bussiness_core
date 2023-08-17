import { Router } from "express";
import { createMaintenance, getMaintenances, getMaintenanceTech } from "../controllers/maintenance.controllers";
import { verifyToken, isTech } from "../middleware/authjwt";

const router = Router();

// Register new Maintenance
router.post("/create-maintenance", verifyToken, isTech, createMaintenance);

// Get all maintenances
router.get("/get-maintenances", getMaintenances);

// Get all maintenance by tech (Dashboard tech services)
router.get("/get-maint-tech", verifyToken, isTech, getMaintenanceTech);

export default router;
