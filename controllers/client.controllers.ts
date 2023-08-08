import { Request, Response } from "express";
import { createClientServ, getClientsServ } from "../services/client.services";


//Register new client
const createClient= async (req: Request, res: Response) => {
    try {
       const client = await createClientServ(req.body);
       res.status(200).json(client);
    } catch (e) {
      console.log(e);
    }
  };
  
  // Get all clients
  const getClients = async (req: Request, res: Response) => {
    try{
      const clients = await getClientsServ();
      res.status(200).json(clients);
    }catch(e){
      console.log(e);
    }
  }
  
  export { createClient, getClients };