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
  } catch (e) {
    console.log(e);
  }
};

// Get all clients
const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await getClientsServ();
    res.status(200).json(clients);
  } catch (e) {
    console.log(e);
  }
};

//Get a client
const getOneClient = async (req: Request, res: Response) => {
  try {
    const clients = await getOneClientServ(req.params.id);
    res.status(200).json(clients);
  } catch (e) {
    console.log(e);
  }
};

//Update a client
const editClient = async (req: Request, res: Response) => {
  try {
    const client = await updateClientServ(req.params.id, req.body);
    res.status(200).json(client);
  } catch (e) {
    console.log(e);
  }
};

//Delete a client
const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await deleteClientServ(req.params.id);
    res.status(200).json(client);
  } catch (e) {
    console.log(e);
  }
};

export { createClient, getClients, getOneClient, editClient, deleteClient };
