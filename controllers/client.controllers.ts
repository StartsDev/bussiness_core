import { Request, Response } from "express";
import {
  createClientServ,
  getClientsServ,
  getClientServPag,
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
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all clients
const getClients = async (req: Request, res: Response) => {
  try {
    // Pagination
    //const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    //const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter
    
    // Filters
    const page = parseInt(req.query.page as string) || undefined;
    const pageSize = parseInt(req.query.pageSize as string) || undefined;
    const businessName = req.query.businessName as string || undefined; 
    const nit = req.query.nit as string || undefined;
    const address = req.query.address as string || undefined;
    const email = req.query.email as string || undefined;
    const phone = req.query.phone as string || undefined;
    const addressh = req.query.addressh as string || undefined;
    const emailh = req.query.emailh as string || undefined;
    const phoneh = req.query.phoneh as string || undefined;
    const city = req.query.city as string || undefined;
    const contact = req.query.contact as string || undefined;
    const headName = req.query.headName as string || undefined;
    const isPrincipal = req.query.isPrincipal as string || undefined;
    const locationName = req.query.locationName as string || undefined;
    const name = req.query.name as string || undefined;
    const serial = req.query.serial as string || undefined;
    const model = req.query.model as string || undefined;
    const type = req.query.type as string || undefined;
    const brand = req.query.brand as string || undefined;

    if (page && pageSize) {
      const { clients, totalCount } = await getClientServPag(
        page,
        pageSize,
        businessName,
        nit,
        address,
        email,
        phone,
        addressh,
        emailh,
        phoneh,
        city,
        contact,
        headName,
        isPrincipal,
        locationName,
        name,
        serial,
        model,
        type,
        brand
      );
      
      const totalPages = Math.ceil((totalCount as number) / (pageSize)) ;
      res.status(200).json({
        clients,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    } else {
      const { clients, totalCount } = await getClientsServ(
        businessName,
        nit,
        address,
        email,
        phone,
        addressh,
        emailh,
        phoneh,
        city,
        contact,
        headName,
        isPrincipal,
        locationName,
        name,
        serial,
        model,
        type,
        brand
      );

      res.status(200).json({
        clients,
        numItmes: totalCount,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Get a client
const getOneClient = async (req: Request, res: Response) => {
  try {
    const clients = await getOneClientServ(req.params.id);
    res.status(200).json(clients);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Update a client
const editClient = async (req: Request, res: Response) => {
  try {
    const client = await updateClientServ(req.params.id, req.body);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Delete a client
const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await deleteClientServ(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export { createClient, getClients, getOneClient, editClient, deleteClient };
