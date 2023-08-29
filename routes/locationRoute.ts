import { Router } from "express";
import {
  createLocation,
  getLocationHead,
  getLocations,
  getOneLocation,
  editLocation,
  deleteLocation,
  bulkCreate,
} from "../controllers/location.controllers";
import { verifyToken, isSuperUser_isAdmin } from "../middleware/authjwt";

const router = Router();

// Register new location
router.post(
  "/create-location",
  verifyToken,
  isSuperUser_isAdmin,
  createLocation
);


//creacion de unicacion bulk
router.post("/bulk-create-locations",bulkCreate);

// Get all locations
router.get("/get-all-locations", getLocations);

// Get one location
router.get("/get-one-location/:id", getOneLocation);

// Get all locations by headquarters
router.get("/get-locations-headquarter/:headquarterId", getLocationHead);

// Update location
router.patch(
  "/update-location/:id",
  verifyToken,
  isSuperUser_isAdmin,
  editLocation
);

// Delete location
router.delete(
  "/delete-location/:id",
  verifyToken,
  isSuperUser_isAdmin,
  deleteLocation
);

export default router;
