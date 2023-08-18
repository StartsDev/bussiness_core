import { Router } from "express";
import { upImgEquip } from "../controllers/imageEquip.controllers";
import { uploadControllerImg } from "../controllers/upload.controllers";

const router = Router();

// Upload photos maintenance
router.post('/upload-image/:id', uploadControllerImg);

// Upload image equipment
router.post('/upload-image-equip/:id', upImgEquip );

export default router;