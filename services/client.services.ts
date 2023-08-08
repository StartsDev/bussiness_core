const Client = require('../models/client')
import { ClientAttributes } from "../interfaces/client.interface";

const createClientServ = async (client: ClientAttributes) => {
    try {
      const findClient = await Client.findOne({ where: { nit: client.nit } });
      if (findClient) {
        return {
          msg: "Este cliente ya existe",
        };
      }
      const newClient = await Client.create(client);
      if (newClient === null) {
        return {
          msg: "Error al registrar el cliente",
        };
      }
      return {
        msg: "Cliente registrado satisfactoriamente...",
        data: newClient,
      };
    } catch (e) {
      throw new Error(e as string);
    }
  };
  
  const getClientsServ = async () => {
      try{
          const clients = await Client.findAll();
          return {
              data: clients
            };
      }catch(e){
        throw new Error(e as string);
      }
  }
  
  
  export { createClientServ, getClientsServ };