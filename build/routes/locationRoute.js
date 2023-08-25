"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controllers_1 = require("../controllers/location.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new location
router.post("/create-location", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, location_controllers_1.createLocation);
// Get all locations
router.get("/get-all-locations", location_controllers_1.getLocations);
// Get one location
router.get("/get-one-location/:id", location_controllers_1.getOneLocation);
// Get all locations by headquarters
router.get("/get-locations-headquarter/:headquarterId", location_controllers_1.getLocationHead);
// Update location
router.patch("/update-location/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, location_controllers_1.editLocation);
// Delete location
router.delete("/delete-location/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, location_controllers_1.deleteLocation);
exports.default = router;
