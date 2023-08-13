"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientServ = exports.updateClientServ = exports.getOneClientServ = exports.getClientsServ = exports.createClientServ = void 0;
const Client = require("../models/client");
const createClientServ = async (client) => {
    try {
        const findClient = await Client.findOne({ where: { nit: client.nit } });
        if (findClient) {
            return { error: new Error("Este cliente ya existe"), success: false };
        }
        const newClient = await Client.create(client);
        if (newClient === null) {
            return { error: new Error("Error al registrar el cliente"), success: false };
        }
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
const getClientsServ = async () => {
    try {
        const clients = await Client.findAll({
            where: { status: false },
            order: [["createdAt", "DESC"]],
        });
        return {
            data: clients,
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
            client: findClient,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getOneClientServ = getOneClientServ;
const updateClientServ = async (id, client) => {
    try {
        const [updateClient] = await Client.update(client, {
            where: {
                id,
            },
            returning: true,
        });
        if (!updateClient) {
            return {
                msg: "Cliente no válido",
            };
        }
        return {
            msg: "Cliente actualizado con exito...",
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