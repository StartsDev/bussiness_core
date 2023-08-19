"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientServ = exports.updateClientServ = exports.getOneClientServ = exports.getClientsServ = exports.createClientServ = void 0;
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
const getClientsServ = async (page, pageSize) => {
    try {
        let clients;
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            clients = await Client.findAll({
                offset,
                limit: pageSize,
                where: { status: false },
                attributes: { exclude: ["updatedAt", "status"] },
                order: [["createdAt", "DESC"]],
                include: {
                    model: Headquarter,
                    as: "headquarters",
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                    include: {
                        model: Location,
                        as: "locations",
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                        include: {
                            model: Equipment,
                            as: "equipments",
                            order: [["createdAt", "DESC"]],
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "status", "locationId"],
                            },
                        },
                    },
                },
            });
            const totalCount = await Client.count({ where: { status: false } });
            return {
                clients,
                totalCount,
                success: true,
            };
        }
        else {
            clients = await Client.findAll({
                where: { status: false },
                attributes: { exclude: ["updatedAt", "status"] },
                order: [["createdAt", "DESC"]],
                include: {
                    model: Headquarter,
                    as: "headquarters",
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                    include: {
                        model: Location,
                        as: "locations",
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
                        include: {
                            model: Equipment,
                            as: "equipments",
                            order: [["createdAt", "DESC"]],
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "status", "locationId"],
                            },
                        },
                    },
                },
            });
            const totalCount = await Client.count({ where: { status: false } });
            return {
                clients,
                totalCount,
                success: true,
            };
        }
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
            client: findClient,
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
        console.log(clientFound);
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
