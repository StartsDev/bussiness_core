"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientServ = exports.updateClientServ = exports.getOneClientServ = exports.getClientsServ = exports.getClientServPag = exports.createClientServ = void 0;
const Sequelize = require("sequelize");
const Client = require("../models/client");
const Headquarter = require("../models/headquarter");
const Location = require("../models/location");
const Equipment = require("../models/equipment");
const createClientServ = async (client) => {
    try {
        const findClient = await Client.findOne({ where: { nit: client.nit } });
        if (findClient) {
            return {
                msg: "Este cliente ya existe",
                success: false,
                data: findClient,
            };
        }
        const newClient = await Client.create(client);
        return {
            msg: "Cliente registrado satisfactoriamente...",
            data: newClient,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.createClientServ = createClientServ;
const getClientServPag = async (page, pageSize, businessName, nit, address, email, phone, addressh, emailh, phoneh, city, contact, headName, isPrincipal, locationName, name, serial, model, type, brand) => {
    try {
        let clients;
        let totalCount = 0;
        //Filters
        let options = {};
        let optionh = {};
        let optionsl = {};
        let optionse = {};
        // Filter client propeties
        if (businessName != undefined) {
            options = {
                businessName: { [Sequelize.Op.like]: `${businessName}%` },
                status: false,
            };
        }
        if (nit != undefined) {
            options = {
                nit: { [Sequelize.Op.like]: `${nit}%` },
                status: false,
            };
        }
        if (address != undefined) {
            options = {
                address: { [Sequelize.Op.like]: `${address}%` },
                status: false,
            };
        }
        if (email != undefined) {
            options = {
                email: { [Sequelize.Op.like]: `${email}%` },
                status: false,
            };
        }
        if (phone != undefined) {
            options = {
                phone: { [Sequelize.Op.like]: `${phone}%` },
                status: false,
            };
        }
        if (city != undefined) {
            options = {
                city: { [Sequelize.Op.like]: `${city}%` },
                status: false,
            };
        }
        if (contact != undefined) {
            options = {
                contact: { [Sequelize.Op.like]: `${contact}%` },
                status: false,
            };
        }
        // Filter heaquarters propeties
        if (headName != undefined) {
            optionh = {
                headName: { [Sequelize.Op.like]: `${headName}%` },
                status: false,
            };
        }
        if (addressh != undefined) {
            optionh = {
                address: { [Sequelize.Op.like]: `${addressh}%` },
                status: false,
            };
        }
        if (emailh != undefined) {
            optionh = {
                email: { [Sequelize.Op.like]: `${emailh}%` },
                status: false,
            };
        }
        if (phoneh != undefined) {
            optionh = {
                phone: { [Sequelize.Op.like]: `${phoneh}%` },
                status: false,
            };
        }
        const whereConditions = {};
        if (isPrincipal === "true") {
            whereConditions.isPrincipal = true;
            optionh = {
                isPrincipal: whereConditions.isPrincipal,
                status: false,
            };
        }
        else if (isPrincipal === "false") {
            whereConditions.isPrincipal = false;
            optionh = {
                isPrincipal: whereConditions.isPrincipal,
                status: false,
            };
        }
        // Filter location propeties
        if (locationName != undefined) {
            optionsl = {
                locationName: { [Sequelize.Op.like]: `${locationName}%` },
                status: false,
            };
        }
        // Filter equipment propeties
        if (name != undefined) {
            optionse = {
                name: { [Sequelize.Op.like]: `${name}%` },
                status: false,
            };
        }
        if (serial != undefined) {
            optionse = {
                serial: { [Sequelize.Op.like]: `${serial}%` },
                status: false,
            };
        }
        if (model != undefined) {
            optionse = {
                model: { [Sequelize.Op.like]: `${model}%` },
                status: false,
            };
        }
        if (type != undefined) {
            optionse = {
                type: { [Sequelize.Op.like]: `${type}%` },
                status: false,
            };
        }
        if (brand != undefined) {
            optionse = {
                brand: { [Sequelize.Op.like]: `${brand}%` },
                status: false,
            };
        }
        // Filter none params
        if (!page &&
            !pageSize &&
            !businessName &&
            !nit &&
            !address &&
            !email &&
            !phone &&
            !addressh &&
            !emailh &&
            !phoneh &&
            !city &&
            !contact &&
            !headName &&
            !isPrincipal &&
            !locationName &&
            !name &&
            !serial &&
            !model &&
            !type &&
            !brand) {
            options = { status: false };
        }
        const linearDatap = [];
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            clients = await Client.findAll({
                offset,
                limit: pageSize,
                where: options,
                attributes: { exclude: ["updatedAt", "status"] },
                order: [["createdAt", "DESC"]],
                include: {
                    model: Headquarter,
                    required: false,
                    where: optionh,
                    as: "headquarters",
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                    include: {
                        model: Location,
                        required: false,
                        where: optionsl,
                        as: "locations",
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                        include: {
                            model: Equipment,
                            required: false,
                            where: optionse,
                            as: "equipments",
                            order: [["createdAt", "DESC"]],
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "status", "locationId"],
                            },
                        },
                    },
                },
            });
            //Hide properties heardquartes and locations
            const propertiesToHide = ["locations"];
            const propToHideLoc = ["equipments"];
            // Customization data clients (serialization) hide some properties
            for (const client of clients) {
                const clientData = client.get({ plain: true });
                clientData.headquarters = [];
                for (const headquarter of client.headquarters) {
                    const sanitizedObject = { ...headquarter.get({ plain: true }) };
                    propertiesToHide.forEach((property) => {
                        delete sanitizedObject[property];
                    });
                    clientData.locations = [];
                    for (const location of headquarter.locations) {
                        const sanitizedObjectLoc = { ...location.get({ plain: true }) };
                        propToHideLoc.forEach((property) => {
                            delete sanitizedObjectLoc[property];
                        });
                        clientData.equipments = [];
                        for (const equipment of location.equipments) {
                            const equipData = equipment.get({ plain: true });
                            clientData.equipments.push(equipData);
                        }
                        clientData.locations.push(sanitizedObjectLoc);
                    }
                    clientData.headquarters.push(sanitizedObject);
                }
                linearDatap.push(clientData);
            }
            if (!clients) {
                return {
                    msg: "No existen clientes registrados...",
                    clients: linearDatap,
                    success: false,
                };
            }
        }
        return {
            clients,
            totalCount: clients.length,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getClientServPag = getClientServPag;
const getClientsServ = async (businessName, nit, address, email, phone, addressh, emailh, phoneh, city, contact, headName, isPrincipal, locationName, name, serial, model, type, brand) => {
    try {
        //Filters
        let totalCount = 0;
        let options = {};
        let optionh = {};
        let optionsl = {};
        let optionse = {};
        // Filter client propeties
        if (businessName != undefined) {
            options = {
                businessName: { [Sequelize.Op.iLike]: `${businessName}%` },
                status: false,
            };
        }
        if (nit != undefined) {
            options = {
                nit: { [Sequelize.Op.like]: `${nit}%` },
                status: false,
            };
        }
        if (address != undefined) {
            options = {
                address: { [Sequelize.Op.like]: `${address}%` },
                status: false,
            };
        }
        if (email != undefined) {
            options = {
                email: { [Sequelize.Op.like]: `${email}%` },
                status: false,
            };
        }
        if (phone != undefined) {
            options = {
                phone: { [Sequelize.Op.like]: `${phone}%` },
                status: false,
            };
        }
        if (city != undefined) {
            options = {
                city: { [Sequelize.Op.like]: `${city}%` },
                status: false,
            };
        }
        if (contact != undefined) {
            options = {
                contact: { [Sequelize.Op.like]: `${contact}%` },
                status: false,
            };
        }
        // Filter heaquarters propeties
        if (headName != undefined) {
            optionh = {
                headName: { [Sequelize.Op.like]: `${headName}%` },
                status: false,
            };
        }
        if (addressh != undefined) {
            optionh = {
                address: { [Sequelize.Op.like]: `${addressh}%` },
                status: false,
            };
        }
        if (emailh != undefined) {
            optionh = {
                email: { [Sequelize.Op.like]: `${emailh}%` },
                status: false,
            };
        }
        if (phoneh != undefined) {
            optionh = {
                phone: { [Sequelize.Op.like]: `${phoneh}%` },
                status: false,
            };
        }
        const whereConditions = {};
        if (isPrincipal === "true") {
            whereConditions.isPrincipal = true;
            optionh = {
                isPrincipal: whereConditions.isPrincipal,
                status: false,
            };
        }
        else if (isPrincipal === "false") {
            whereConditions.isPrincipal = false;
            optionh = {
                isPrincipal: whereConditions.isPrincipal,
                status: false,
            };
        }
        // Filter location propeties
        if (locationName != undefined) {
            optionsl = {
                locationName: { [Sequelize.Op.like]: `${locationName}%` },
                status: false,
            };
        }
        // Filter equipment propeties
        if (name != undefined) {
            optionse = {
                name: { [Sequelize.Op.like]: `${name}%` },
                status: false,
            };
        }
        if (serial != undefined) {
            optionse = {
                serial: { [Sequelize.Op.like]: `${serial}%` },
                status: false,
            };
        }
        if (model != undefined) {
            optionse = {
                model: { [Sequelize.Op.like]: `${model}%` },
                status: false,
            };
        }
        if (type != undefined) {
            optionse = {
                type: { [Sequelize.Op.like]: `${type}%` },
                status: false,
            };
        }
        if (brand != undefined) {
            optionse = {
                brand: { [Sequelize.Op.like]: `${brand}%` },
                status: false,
            };
        }
        // Filter none params
        if (!businessName &&
            !nit &&
            !address &&
            !email &&
            !phone &&
            !addressh &&
            !emailh &&
            !phoneh &&
            !city &&
            !contact &&
            !headName &&
            !isPrincipal &&
            !locationName &&
            !name &&
            !serial &&
            !model &&
            !type &&
            !brand) {
            options = { status: false };
        }
        // All query clients
        const linearDatap = [];
        const clients = await Client.findAll({
            where: options,
            attributes: { exclude: ["updatedAt", "status", "headquarters"] },
            order: [["createdAt", "DESC"]],
            all: true,
            include: [
                {
                    model: Headquarter,
                    where: optionh,
                    required: false,
                    as: "headquarters",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "status", "clientId"],
                    },
                    include: {
                        model: Location,
                        where: optionsl,
                        required: false,
                        as: "locations",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "status",
                                "headquarterId",
                                "description",
                            ],
                        },
                        include: {
                            model: Equipment,
                            where: optionse,
                            required: false,
                            as: "equipments",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "status", "locationId"],
                            },
                        },
                    },
                },
            ],
            required: false,
        });
        Sequelize.options.logging = false;
        if (!clients) {
            return {
                msg: "No existen clientes registrados...",
                clients,
                success: false,
            };
        }
        //Hide properties heardquartes and locations
        const propertiesToHide = ["locations"];
        const propToHideLoc = ["equipments"];
        // Customization data clients (serialization) hide some properties
        for (const client of clients) {
            const clientData = client.get({ plain: true });
            clientData.headquarters = [];
            for (const headquarter of client.headquarters) {
                const sanitizedObject = { ...headquarter.get({ plain: true }) };
                propertiesToHide.forEach((property) => {
                    delete sanitizedObject[property];
                });
                clientData.locations = [];
                for (const location of headquarter.locations) {
                    const sanitizedObjectLoc = { ...location.get({ plain: true }) };
                    propToHideLoc.forEach((property) => {
                        delete sanitizedObjectLoc[property];
                    });
                    clientData.equipments = [];
                    for (const equipment of location.equipments) {
                        const equipData = equipment.get({ plain: true });
                        clientData.equipments.push(equipData);
                    }
                    clientData.locations.push(sanitizedObjectLoc);
                }
                clientData.headquarters.push(sanitizedObject);
            }
            linearDatap.push(clientData);
        }
        return {
            clients: linearDatap,
            totalCount: clients.length,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getClientsServ = getClientsServ;
const getOneClientServ = async (client) => {
    try {
        const findClient = await Client.findOne({
            where: { id: client },
        });
        if (!client) {
            return {
                msg: "Este cliente no existe",
            };
        }
        return {
            findClient,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getOneClientServ = getOneClientServ;
const updateClientServ = async (id, cli) => {
    try {
        const clientFound = await Client.findOne({ where: { id } });
        if (!clientFound) {
            return {
                msg: "Cliente no encontrado",
            };
        }
        const [updateClient] = await Client.update(cli, {
            where: {
                id,
            },
            returning: true,
        });
        if (updateClient <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const client = await Client.findOne({ where: { id } });
        return {
            msg: "Cliente actualizado con exito...",
            client,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.updateClientServ = updateClientServ;
const deleteClientServ = async (id) => {
    try {
        const findClient = await Client.findOne({ where: { id } });
        if (findClient.dataValues.status) {
            return {
                msg: "El cliente ya ha sido retirado",
            };
        }
        const deletedClient = await Client.update({ status: true }, {
            where: {
                id,
            },
        });
        if (!deletedClient) {
            return {
                msg: "Cliente no válido",
            };
        }
        return {
            msg: "Cliente eliminado con exito...",
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteClientServ = deleteClientServ;
