const Client = require("../models/client");
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
  try {
    const clients = await Client.findAll({
      where: { status: false },
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
    //const {numIdent,firstName, lastName, email, phone, identId, roleId} = client
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
    if (findClient.status) {
      return {
        msg: "Cliente no válido",
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
