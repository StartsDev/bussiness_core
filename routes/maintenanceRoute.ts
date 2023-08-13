import { Router } from "express";
import { createMaintenance } from "../controllers/maintenance.controllers";
import { verifyToken, isTech } from "../middleware/authjwt";

const router = Router();

// Register new Maintenance
router.post("/create-maintenance", verifyToken, isTech, createMaintenance);

export default router;
