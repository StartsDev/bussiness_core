import { Router } from "express";
import { upImgEquip } from "../controllers/imageEquip.controllers";
import { uploadControllerImg } from "../controllers/upload.controllers";
import { verifyToken, isSuperUser_isAdmin } from "../middleware/authjwt";

const router = Router();

// Upload photos maintenance
router.post(
  "/upload-image/:id",
  verifyToken,
  isSuperUser_isAdmin,
  uploadControllerImg
);

// Upload image equipment
router.post(
  "/upload-image-equip/:id",
  verifyToken,
  isSuperUser_isAdmin,
  upImgEquip
);

export default router;
