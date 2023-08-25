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
        // Pagination
        //const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
        //const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter
        // Filters
        const page = parseInt(req.query.page) || undefined;
        const pageSize = parseInt(req.query.pageSize) || undefined;
        const businessName = req.query.businessName || undefined;
        const nit = req.query.nit || undefined;
        const address = req.query.address || undefined;
        const email = req.query.email || undefined;
        const phone = req.query.phone || undefined;
        const addressh = req.query.addressh || undefined;
        const emailh = req.query.emailh || undefined;
        const phoneh = req.query.phoneh || undefined;
        const city = req.query.city || undefined;
        const contact = req.query.contact || undefined;
        const headName = req.query.headName || undefined;
        const isPrincipal = req.query.isPrincipal || undefined;
        const locationName = req.query.locationName || undefined;
        const name = req.query.name || undefined;
        const serial = req.query.serial || undefined;
        const model = req.query.model || undefined;
        const type = req.query.type || undefined;
        const brand = req.query.brand || undefined;
        if (page && pageSize) {
            const { clients, totalCount } = await (0, client_services_1.getClientServPag)(page, pageSize, businessName, nit, address, email, phone, addressh, emailh, phoneh, city, contact, headName, isPrincipal, locationName, name, serial, model, type, brand);
            const totalPages = Math.ceil(totalCount / (pageSize));
            res.status(200).json({
                clients,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
        else {
            const { clients, totalCount } = await (0, client_services_1.getClientsServ)(businessName, nit, address, email, phone, addressh, emailh, phoneh, city, contact, headName, isPrincipal, locationName, name, serial, model, type, brand);
            res.status(200).json({
                locations: clients,
                numItmes: totalCount,
            });
        }
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
