import { Router } from "express";
import {
  createLocation,
  getLocationHead,
  getLotaions,
  getOneLocation,
  editLocation,
  deleteLocation,
} from "../controllers/location.controllers";

const router = Router();

// Register new location
router.post("/create-location", createLocation);

// Get all locations
router.get("/get-all-locations", getLotaions);

// Get one location
router.get("/get-one-location/:id", getOneLocation);

// Get all locations by headquarters
router.get("/get-locations-headquarter/:headquarterId", getLocationHead);

// Update location
router.patch("/update-location/:id", editLocation);

// Delete location
router.delete("/delete-location/:id", deleteLocation);

export default router;
