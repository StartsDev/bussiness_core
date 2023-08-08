import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controllers";


const router = Router();

// Register new client
router.post("/create-client", createClient);

// Get all clients
router.get("/get-clients", getClients);

export default router;
