import { Router } from "express";
import { uploadControllerImg } from "../controllers/upload.controllers";



const router = Router();

router.post('/upload-image/:id', uploadControllerImg)

export default router;