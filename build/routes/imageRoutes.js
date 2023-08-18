"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageEquip_controllers_1 = require("../controllers/imageEquip.controllers");
const upload_controllers_1 = require("../controllers/upload.controllers");
const router = (0, express_1.Router)();
// Upload photos maintenance
router.post('/upload-image/:id', upload_controllers_1.uploadControllerImg);
// Upload image equipment
router.post('/upload-image-equip/:id', imageEquip_controllers_1.upImgEquip);
exports.default = router;
