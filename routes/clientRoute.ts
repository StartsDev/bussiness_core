import { Router } from "express";
import {
  createClient,
  getClients,
  getOneClient,
  editClient,
  deleteClient,
} from "../controllers/client.controllers";
import { verifyToken, isSuperUser_isAdmin } from "../middleware/authjwt";

const router = Router();

// Register Client
router.post("/create-client", verifyToken, /*isSuperUser_isAdmin*/ createClient);

// Get all Clients
router.get("/get-clients", getClients);

// Get Client
router.get("/get-client/:id", getOneClient);

//Update Client
router.patch(
  "/update-client/:id",
  verifyToken,
  isSuperUser_isAdmin,
  editClient
);


//Delete Client
router.delete(
  "/delete-client/:id",
  verifyToken,
  isSuperUser_isAdmin,
  deleteClient
);

export default router;
