import { Router } from "express";
import { createMaintenance, getMaintenances } from "../controllers/maintenance.controllers";
import { verifyToken, isTech } from "../middleware/authjwt";

const router = Router();

// Register new Maintenance
router.post("/create-maintenance", verifyToken, isTech, createMaintenance);
//router.post("/create-maintenance", createMaintenance);

router.get("/get-maintenances", getMaintenances)

export default router;
