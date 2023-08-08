import { Router } from "express";
import {
  createClient,
  getClients,
  getOneClient,
  editClient,
  deleteClient,
} from "../controllers/client.controllers";

const router = Router();

// Register Client
router.post("/create-client", createClient);

// Get all Clients
router.get("/get-clients", getClients);

// Get Client
router.get("/get-client/:id", getOneClient);

//Update Client
router.patch("/update-client/:id", editClient);

//Delete Client
router.patch("/delete-client/:id", deleteClient);

export default router;
