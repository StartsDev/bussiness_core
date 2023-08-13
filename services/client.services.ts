const Client = require("../models/client");
import { ClientAttributes } from "../interfaces/client.interface";

const createClientServ = async (client: ClientAttributes) => {
  try {
    const findClient = await Client.findOne({ where: { nit: client.nit } });
    if (findClient) {
      console.log(findClient)
      return { error: "Este cliente ya existe", success: false };
    }
    
    const newClient = await Client.create(client);
    
    return {
      msg: "Cliente registrado satisfactoriamente...",
      data: newClient,
      success: true,
    };
  } catch (e) {
    console.log(e)
    throw new Error(e as string);
  }
};

const getClientsServ = async () => {
  try {
    const clients = await Client.findAll({
      where: { status: false },
      order: [["createdAt", "DESC"]],
    });
    return {
      data: clients,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getOneClientServ = async (client: any) => {
  try {
    const findClient = await Client.findOne({
      where: { id: client },
    });
    if (!client) {
      return {
        msg: "Este cliente no existe",
      };
    }
    return {
      client: findClient,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateClientServ = async (id: any, client: any) => {
  try {
    const [updateClient] = await Client.update(client, {
      where: {
        id,
      },
      returning: true,
    });
    if (!updateClient) {
      return {
        msg: "Cliente no válido",
      };
    }
    return {
      msg: "Cliente actualizado con exito...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteClientServ = async (id: any) => {
  try {
    const findClient = await Client.findOne({ where: { id } });
    if (findClient.dataValues.status) {
      return {
        msg: "El cliente ya ha sido retirado",
      };
    }
    const deletedClient = await Client.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
    if (!deletedClient) {
      return {
        msg: "Cliente no válido",
      };
    }
    return {
      msg: "Cliente eliminado con exito...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export {
  createClientServ,
  getClientsServ,
  getOneClientServ,
  updateClientServ,
  deleteClientServ,
};
