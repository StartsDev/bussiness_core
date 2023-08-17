"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeadquarter = exports.editHeadquarter = exports.getHeadqClient = exports.getOneHeadquarter = exports.getHeadquarters = exports.createHeadqaurter = void 0;
const headq_services_1 = require("../services/headq.services");
//Register new headquarter
const createHeadqaurter = async (req, res) => {
    try {
        const headquarter = await (0, headq_services_1.createHeadServ)(req.body);
        res.status(200).json(headquarter);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.createHeadqaurter = createHeadqaurter;
// Get all headquarters
const getHeadquarters = async (req, res) => {
    try {
        const headquarters = await (0, headq_services_1.getHeadServ)();
        res.status(200).json(headquarters);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getHeadquarters = getHeadquarters;
// Get one headquarters
const getOneHeadquarter = async (req, res) => {
    try {
        const headquarter = await (0, headq_services_1.getOneHeadServ)(req.params.id);
        res.status(200).json(headquarter);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getOneHeadquarter = getOneHeadquarter;
// Get headquarters by client
const getHeadqClient = async (req, res) => {
    try {
        const headersq = await (0, headq_services_1.allHeadClientServ)(req.params.clientId);
        res.status(200).json(headersq);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.getHeadqClient = getHeadqClient;
// Update headquarter
const editHeadquarter = async (req, res) => {
    try {
        const headquarter = await (0, headq_services_1.updateHeadServ)(req.params.id, req.body);
        res.status(200).json(headquarter);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.editHeadquarter = editHeadquarter;
//Delete headquarter
const deleteHeadquarter = async (req, res) => {
    try {
        const head = await (0, headq_services_1.deleteHeadServ)(req.params.id);
        res.status(200).json(head);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
};
exports.deleteHeadquarter = deleteHeadquarter;
