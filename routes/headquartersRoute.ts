import { Router } from "express";
import {
  createHeadqaurter,
  getHeadquarters,
  getOneHeadquarter,
  getHeadqClient,
  editHeadquarter,
  deleteHeadquarter
} from "../controllers/headq.controllers";

const router = Router();

// Register new headquarter
router.post("/create-headquarter", createHeadqaurter);

// Get headquarters
router.get("/get-headquarters", getHeadquarters);

// Get headquarter
router.get("/get-one-headquarter/:id", getOneHeadquarter);

// Get all headquarters by client
router.get('/get-headquarters-client/:clientId', getHeadqClient);

// Update headquarter
router.patch("/update-headquarter/:id", editHeadquarter);

// Delete headquarter
router.delete("/delete-headquarter/:id", deleteHeadquarter);

export default router;
