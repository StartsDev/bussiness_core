import { Router } from "express";
import {
  createHeadqaurter,
  getHeadquarters,
  getOneHeadquarter,
  getHeadqClient,
  editHeadquarter,
  deleteHeadquarter,
} from "../controllers/headq.controllers";
import { verifyToken, isSuperUser_isAdmin } from "../middleware/authjwt";

const router = Router();

// Register new headquarter
router.post(
  "/create-headquarter",
  verifyToken,
  isSuperUser_isAdmin,
  createHeadqaurter
);

// Get headquarters
router.get("/get-headquarters", getHeadquarters);

// Get headquarter
router.get("/get-one-headquarter/:id", getOneHeadquarter);

// Get all headquarters by client
router.get("/get-headquarters-client/:clientId", getHeadqClient);

// Update headquarter
router.patch(
  "/update-headquarter/:id",
  verifyToken,
  isSuperUser_isAdmin,
  editHeadquarter
);

// Delete headquarter
router.delete(
  "/delete-headquarter/:id",
  verifyToken,
  isSuperUser_isAdmin,
  deleteHeadquarter
);

export default router;
