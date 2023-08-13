"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controllers_1 = require("../controllers/upload.controllers");
const router = (0, express_1.Router)();
router.post('/upload-image/:id', upload_controllers_1.uploadControllerImg);
exports.default = router;
