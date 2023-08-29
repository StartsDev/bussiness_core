import { Router } from "express";
import {
  createEquipment,
  getAllEquipments,
  getOneEquipment,
  getEquipmentsLocation,
  editEquipment,
  deleteEquipment,
  bulkCreate,
} from "../controllers/equipment.controllers";
import { verifyToken, isSuperUser_isAdmin } from "../middleware/authjwt";

const router = Router();

// Register new equipment
router.post(
  "/create-equipment",
  verifyToken,
  isSuperUser_isAdmin,
  createEquipment
);

//creacion de unicacion bulk
router.post("/bulk-create-equipments",bulkCreate);

// Get all equipments
router.get("/get-all-equipments", getAllEquipments);

// Get one equipment
router.get("/get-equipment/:id", getOneEquipment);

// Get equipments by location
router.get("/get-all-equipments-location/:locationId", getEquipmentsLocation);

// Update equipment
router.patch(
  "/update-equipment/:id",
  verifyToken,
  isSuperUser_isAdmin,
  editEquipment
);

// Delete equipment
router.delete(
  "/delete-equipment/:id",
  verifyToken,
  isSuperUser_isAdmin,
  deleteEquipment
);

export default router;
