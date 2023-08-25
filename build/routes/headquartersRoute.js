"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const headq_controllers_1 = require("../controllers/headq.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new headquarter
router.post("/create-headquarter", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, headq_controllers_1.createHeadqaurter);
// Get headquarters
router.get("/get-headquarters", headq_controllers_1.getHeadquarters);
// Get headquarter
router.get("/get-one-headquarter/:id", headq_controllers_1.getOneHeadquarter);
// Get all headquarters by client
router.get("/get-headquarters-client/:clientId", headq_controllers_1.getHeadqClient);
// Update headquarter
router.patch("/update-headquarter/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, headq_controllers_1.editHeadquarter);
// Delete headquarter
router.delete("/delete-headquarter/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, headq_controllers_1.deleteHeadquarter);
exports.default = router;
