"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controllers_1 = require("../controllers/client.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register Client
router.post("/create-client", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, client_controllers_1.createClient);
// Get all Clients
router.get("/get-clients", client_controllers_1.getClients);
// Get Client
router.get("/get-client/:id", client_controllers_1.getOneClient);
//Update Client
router.patch("/update-client/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, client_controllers_1.editClient);
//Delete Client
router.delete("/delete-client/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, client_controllers_1.deleteClient);
exports.default = router;
