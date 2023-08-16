import { Request, Response } from "express";
import {
  createClientServ,
  getClientsServ,
  getOneClientServ,
  updateClientServ,
  deleteClientServ,
} from "../services/client.services";

//Register new client
const createClient = async (req: Request, res: Response) => {
  try {
    const client = await createClientServ(req.body);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

// Get all clients
const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await getClientsServ();
    res.status(200).json({clients, success:true});
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

//Get a client
const getOneClient = async (req: Request, res: Response) => {
  try {
    const clients = await getOneClientServ(req.params.id);
    res.status(200).json(clients);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

//Update a client
const editClient = async (req: Request, res: Response) => {
  try {
    const client = await updateClientServ(req.params.id, req.body);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

//Delete a client
const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await deleteClientServ(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

export { createClient, getClients, getOneClient, editClient, deleteClient };
