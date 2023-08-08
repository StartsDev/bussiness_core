import { Router } from "express";
import { createHeadqaurter, getHeadquarters } from "../controllers/headq.controllers";

const router = Router();

// Register new headquarter
router.post("/create-headquarter", createHeadqaurter);

// Get headquarters
router.get("/get-headquarters", getHeadquarters);

export default router;
