const Client = require("../models/client");
const Headquarter = require("../models/headquarter");
const Location = require("../models/location");
const Equipment = require("../models/equipment");
import { ClientAttributes } from "../interfaces/client.interface";

const createClientServ = async (client: ClientAttributes) => {
  try {
    const findClient = await Client.findOne({ where: { nit: client.nit } });
    if (findClient) {
      return {
        msg: "Este cliente ya existe",
        success: false,
        data: findClient,
      };
    }

    const newClient = await Client.create(client);

    return {
      msg: "Cliente registrado satisfactoriamente...",
      data: newClient,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getClientsServ = async (page: number, pageSize: number) => {
  try {
    const offset = (page - 1) * pageSize;

    const clients = await Client.findAll({
      offset,
      limit: pageSize,
      where: { status: false },
      attributes: { exclude: ["updatedAt", "status"] },
      order: [["createdAt", "DESC"]],
      include: {
        model: Headquarter,
        as: "headquarters",
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
        include: {
          model: Location,
          as: "locations",
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt", "status"] },
          include: {
            model: Equipment,
            as: "equipments",
            order: [["createdAt", "DESC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt", "status", "locationId"],
            },
          },
        },
      },
    });
    const totalCount = await Client.count({ where: { status: false } });

    return {
      clients,
      totalCount,
      success: true,
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

const updateClientServ = async (id: any, cli: any) => {
  try {
    const clientFound = await Client.findOne({ where: { id } });
    console.log(clientFound);
    if (!clientFound) {
      return {
        msg: "Cliente no encontrado",
      };
    }
    const [updateClient] = await Client.update(cli, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateClient <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const client = await Client.findOne({ where: { id } });
    return {
      msg: "Cliente actualizado con exito...",
      client,
      success: true,
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
