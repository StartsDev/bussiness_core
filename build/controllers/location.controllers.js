"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.editLocation = exports.getLocationHead = exports.getOneLocation = exports.getLocations = exports.createLocation = void 0;
const location_services_1 = require("../services/location.services");
// Create new Location
const createLocation = async (req, res) => {
    try {
        const headquarter = await (0, location_services_1.createLocationServ)(req.body);
        res.status(200).json(headquarter);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.createLocation = createLocation;
// Get all locations
const getLocations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const locationName = req.query.locationName || undefined;
        const headName = req.query.headName || undefined;
        const businessName = req.query.businessName || undefined;
        if (!page && !pageSize) {
            const { linearData, totalCount } = await (0, location_services_1.getLocationsServ)(locationName, headName, businessName);
            res.status(200).json({
                locations: linearData,
                numItmes: totalCount,
            });
        }
        else {
            const { linearDatap, totalCountp } = await (0, location_services_1.getLocationServPag)(page, pageSize, locationName, headName, businessName);
            const totalPages = Math.ceil(totalCountp / (pageSize ?? totalCountp));
            res.status(200).json({
                locations: linearDatap,
                numItmes: totalCountp,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getLocations = getLocations;
// Get one location
const getOneLocation = async (req, res) => {
    try {
        const location = await (0, location_services_1.getOneLocationServ)(req.params.id);
        res.status(200).json(location);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getOneLocation = getOneLocation;
// Get locations by headquarters
const getLocationHead = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { locations, totalCount } = await (0, location_services_1.allLocationsHeadServ)(req.params.headquarterId, page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                locations,
                numItmes: totalCount,
            });
        }
        else {
            const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
            res.status(200).json({
                locations,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getLocationHead = getLocationHead;
// Update location
const editLocation = async (req, res) => {
    try {
        const location = await (0, location_services_1.updateLocationServ)(req.params.id, req.body);
        res.status(200).json(location);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.editLocation = editLocation;
// Delete location
const deleteLocation = async (req, res) => {
    try {
        const location = await (0, location_services_1.deleteLocationServ)(req.params.id);
        res.status(200).json(location);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.deleteLocation = deleteLocation;
