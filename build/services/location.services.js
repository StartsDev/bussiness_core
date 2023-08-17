"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationServ = exports.updateLocationServ = exports.allLocationsHeadServ = exports.getOneLocationServ = exports.getLocationsServ = exports.createLocationServ = void 0;
const Location = require("../models/location");
const Headquarters = require("../models/headquarter");
const Client = require("../models/client");
// Create a location
const createLocationServ = async (location) => {
    try {
        const findHeadquarter = await Headquarters.findOne({
            where: { id: location.headquarterId },
        });
        if (!findHeadquarter) {
            return {
                msg: "El Id de la sede no existe...",
            };
        }
        const findLocation = await Location.findOne({
            where: { locationName: location.locationName },
        });
        if (findLocation) {
            return {
                msg: "Esta ubicación ya existe",
            };
        }
        const newLocation = await Location.create(location);
        return {
            msg: "Ubicación registrada satisfactoriamente...",
            location: newLocation,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.createLocationServ = createLocationServ;
// Get locations
const getLocationsServ = async () => {
    try {
        const locations = await Location.findAll({
            where: { status: false },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Headquarters,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                    include: [
                        {
                            model: Client,
                            attributes: {
                                exclude: ["id", "createdAt", "updatedAt", "status"],
                            },
                        },
                    ],
                },
            ],
        });
        return {
            data: locations,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getLocationsServ = getLocationsServ;
// Get one location
const getOneLocationServ = async (location) => {
    try {
        const findHead = await Location.findOne({
            where: { id: location },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Headquarters,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                    include: [
                        {
                            model: Client,
                            attributes: {
                                exclude: ["id", "createdAt", "updatedAt", "status"],
                            },
                        },
                    ],
                },
            ],
        });
        if (!location) {
            return {
                msg: "Esta ubicación no existe",
            };
        }
        return {
            client: findHead,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getOneLocationServ = getOneLocationServ;
//Get locations by headquarter
const allLocationsHeadServ = async (location) => {
    try {
        const locationHead = await Location.findAll({
            where: { headquarterId: location },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Headquarters,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                },
            ],
        });
        if (!locationHead) {
            return {
                msg: "Lugares no hay con esta sede",
                users: [],
            };
        }
        return { data: locationHead };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.allLocationsHeadServ = allLocationsHeadServ;
// Update location
const updateLocationServ = async (id, location) => {
    try {
        const locationFound = await Location.findOne({ where: { id } });
        if (!locationFound) {
            return {
                msg: "Ubicación no válida",
            };
        }
        const headFound = await Headquarters.findOne({
            where: { id: location.headquarterId },
        });
        if (!headFound) {
            return {
                msg: "Sede no válida",
            };
        }
        const [updateLocation] = await Location.update(location, {
            where: {
                id,
            },
            returning: true,
        });
        if (!updateLocation) {
            return {
                msg: "Actualización no es correcta",
            };
        }
        return {
            msg: "Sede actualizada con exito...",
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.updateLocationServ = updateLocationServ;
// Delete location
const deleteLocationServ = async (id) => {
    try {
        const findLocation = await Location.findOne({ where: { id } });
        if (findLocation.dataValues.status) {
            return {
                msg: "La ubicación no válida",
            };
        }
        const deletedLocation = await Location.update({ status: true }, {
            where: {
                id,
            },
        });
        if (!deletedLocation) {
            return {
                msg: "Ubicación no válida",
            };
        }
        return {
            msg: "Ubicación eliminada con exito...",
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteLocationServ = deleteLocationServ;
