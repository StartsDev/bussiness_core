"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreate = exports.deleteLocation = exports.editLocation = exports.getLocationHead = exports.getOneLocation = exports.getLocations = exports.createLocation = void 0;
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
        const addressh = req.query.addressh || undefined;
        const emailh = req.query.emailh || undefined;
        const phoneh = req.query.phoneh || undefined;
        const businessName = req.query.businessName || undefined;
        const nit = req.query.nit || undefined;
        const city = req.query.city || undefined;
        const contact = req.query.contact || undefined;
        const addressc = req.query.addressc || undefined;
        const emailc = req.query.emailc || undefined;
        const phonec = req.query.phonec || undefined;
        if (!page && !pageSize) {
            const { linearData, totalCount } = await (0, location_services_1.getLocationsServ)(locationName, headName, addressh, emailh, phoneh, businessName, nit, city, contact, addressc, emailc, phonec);
            res.status(200).json({
                locations: linearData,
                numItmes: totalCount,
            });
        }
        if (page && pageSize) {
            const { linearDatap, totalCountp, totalPages } = await (0, location_services_1.getLocationServPag)(page, pageSize, locationName, headName, addressh, emailh, phoneh, businessName, nit, city, contact, addressc, emailc, phonec);
            res.status(200).json({
                locations: linearDatap,
                numItmes: totalCountp,
                currentPage: page,
                totalPages,
            });
        }
        // if (pageSize) {
        //   res.status(400).json({
        //     msg: "Tiene que haber un número de página...",
        //   });
        // }
        // if (page) {
        //   res.status(400).json({
        //     msg: "Debe indicar el número de items por página...",
        //   });
        // }
    }
    catch (error) {
        console.log('error', error);
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
        const locationName = req.query.locationName || undefined;
        const { locations, totalCount, totalPages } = await (0, location_services_1.allLocationsHeadServ)(req.params.headquarterId, page, pageSize, locationName);
        if (!page && !pageSize) {
            res.status(200).json({
                locations,
                numItmes: totalCount,
            });
        }
        else {
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
//bulkcreate Location
const bulkCreate = async (req, res) => {
    try {
        const location = await (0, location_services_1.bulkCreateLocations)(req.body);
        res.status(200).json(location);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.bulkCreate = bulkCreate;
