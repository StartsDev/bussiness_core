"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageEquip_controllers_1 = require("../controllers/imageEquip.controllers");
const upload_controllers_1 = require("../controllers/upload.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Upload photos maintenance
router.post("/upload-image/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, upload_controllers_1.uploadControllerImg);
// Upload image equipment
router.post("/upload-image-equip/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser_isAdmin, imageEquip_controllers_1.upImgEquip);
exports.default = router;
