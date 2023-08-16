"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.editClient = exports.getOneClient = exports.getClients = exports.createClient = void 0;
const client_services_1 = require("../services/client.services");
//Register new client
const createClient = async (req, res) => {
    try {
        const client = await (0, client_services_1.createClientServ)(req.body);
        res.status(200).json(client);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.createClient = createClient;
// Get all clients
const getClients = async (req, res) => {
    try {
        const clients = await (0, client_services_1.getClientsServ)();
        res.status(200).json({ clients, success: true });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getClients = getClients;
//Get a client
const getOneClient = async (req, res) => {
    try {
        const clients = await (0, client_services_1.getOneClientServ)(req.params.id);
        res.status(200).json(clients);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getOneClient = getOneClient;
//Update a client
const editClient = async (req, res) => {
    try {
        const client = await (0, client_services_1.updateClientServ)(req.params.id, req.body);
        res.status(200).json(client);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.editClient = editClient;
//Delete a client
const deleteClient = async (req, res) => {
    try {
        const client = await (0, client_services_1.deleteClientServ)(req.params.id);
        res.status(200).json(client);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.deleteClient = deleteClient;
