const Sequelize = require("sequelize");
const Client = require("../models/client");
const Headquarter = require("../models/headquarter");
const Location = require("../models/location");
const Equipment = require("../models/equipment");
import axios from "axios";
import { stringify } from "querystring";
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

const getClientServPag = async (
  page?: number,
  pageSize?: number,
  businessName?: string,
  nit?: string,
  address?: string,
  email?: string,
  phone?: string,
  addressh?: string,
  emailh?: string,
  phoneh?: string,
  city?: string,
  contact?: string,
  headName?: string,
  isPrincipal?: string,
  locationName?: string,
  name?: string,
  serial?: string,
  model?: string,
  type?: string,
  brand?: string
) => {
  try {
    let clients;
    let combinedResults: any[] = [];
    //Filters
    let options: any | undefined = {};
    let optionh: any | undefined = {};
    let optionsl: any | undefined = {};
    let optionse: any | undefined = {};

    // Filter client propeties

    if (businessName != undefined) {
      options = {
        businessName: { [Sequelize.Op.iLike]: `${businessName}%` },
        status: false,
      };
    }
    if (nit != undefined) {
      options = {
        nit: { [Sequelize.Op.iLike]: `${nit}%` },
        status: false,
      };
    }
    if (address != undefined) {
      options = {
        address: { [Sequelize.Op.iLike]: `${address}%` },
        status: false,
      };
    }
    if (email != undefined) {
      options = {
        email: { [Sequelize.Op.iLike]: `${email}%` },
        status: false,
      };
    }
    if (phone != undefined) {
      options = {
        phone: { [Sequelize.Op.iLike]: `${phone}%` },
        status: false,
      };
    }
    if (city != undefined) {
      options = {
        city: { [Sequelize.Op.iLike]: `${city}%` },
        status: false,
      };
    }
    if (contact != undefined) {
      options = {
        contact: { [Sequelize.Op.iLike]: `${contact}%` },
        status: false,
      };
    }

    // Filter heaquarters propeties
    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.iLike]: `${headName}%` },
        status: false,
      };
    }

    if (addressh != undefined) {
      optionh = {
        address: { [Sequelize.Op.iLike]: `${addressh}%` },
        status: false,
      };
    }

    if (emailh != undefined) {
      optionh = {
        email: { [Sequelize.Op.iLike]: `${emailh}%` },
        status: false,
      };
    }

    if (phoneh != undefined) {
      optionh = {
        phone: { [Sequelize.Op.iLike]: `${phoneh}%` },
        status: false,
      };
    }

    const whereConditions: any = {};

    if (isPrincipal === "true") {
      whereConditions.isPrincipal = true;
      optionh = {
        isPrincipal: whereConditions.isPrincipal,
        status: false,
      };
    } else if (isPrincipal === "false") {
      whereConditions.isPrincipal = false;
      optionh = {
        isPrincipal: whereConditions.isPrincipal,
        status: false,
      };
    }

    // Filter location propeties

    if (locationName != undefined) {
      optionsl = {
        locationName: { [Sequelize.Op.iLike]: `${locationName}%` },
        status: false,
      };
    }

    // Filter equipment propeties

    if (name != undefined) {
      optionse = {
        name: { [Sequelize.Op.iLike]: `${name}%` },
        status: false,
      };
    }
    if (serial != undefined) {
      optionse = {
        serial: { [Sequelize.Op.iLike]: `${serial}%` },
        status: false,
      };
    }
    if (model != undefined) {
      optionse = {
        model: { [Sequelize.Op.iLike]: `${model}%` },
        status: false,
      };
    }
    if (type != undefined) {
      optionse = {
        type: { [Sequelize.Op.iLike]: `${type}%` },
        status: false,
      };
    }
    if (brand != undefined) {
      optionse = {
        brand: { [Sequelize.Op.iLike]: `${brand}%` },
        status: false,
      };
    }

    // Filter none params
    if (
      !businessName &&
      !nit &&
      !address &&
      !email &&
      !phone &&
      !addressh &&
      !emailh &&
      !phoneh &&
      !city &&
      !contact &&
      !headName &&
      !isPrincipal &&
      !locationName &&
      !name &&
      !serial &&
      !model &&
      !type &&
      !brand
    ) {
      options = { status: false };
    }
   

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      // All query clients
      clients = await Client.findAll({
        offset,
        limit: pageSize,
        where: options,
        attributes: [
          "id",
          "businessName",
          "nit",
          "address",
          "email",
          "phone",
          "city",
          "contact",
          "user_app",
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
      });

      if (!clients) {
        return {
          msg: "No existen clientes registrados...",
          clients: [],
          success: false,
        };
      }

      // Obtén los resultados de Headquarter, Location y Equipment
      const headquarterIds = clients.map((client: any) => client.id);

      const headquarters = await Headquarter.findAll({
        where: { clientId: headquarterIds },
        optionh,
        attributes: [
          "id",
          "headName",
          "address",
          "email",
          "phone",
          "isPrincipal",
          "clientId",
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
      });

      const locationIds = headquarters.map((hq: any) => hq.id);

      const locations = await Location.findAll({
        where: {
          headquarterId: locationIds,
        },
        optionsl,
        attributes: ["id", "locationName", "headquarterId"],
        order: [["createdAt", "DESC"]],
        raw: true,
      });

      const equipment = await Equipment.findAll({
        where: optionse,
        attributes: [
          "id",
          "name",
          "description",
          "serial",
          "image",
          "model",
          "type",
          "brand",
          "locationId",
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
      });
      // Combinar los resultados en un solo array de objetos
        combinedResults = clients.map((client: any) => {
        const clientHeadquarters = headquarters.filter(
          (hq: any) => hq.clientId === client.id
        );
        const clientLocations = locations.filter((loc: any) =>
          clientHeadquarters.some((hq: any) => hq.id === loc.headquarterId)
        );
        const clientEquipments = equipment.filter((eq: any) =>
          clientLocations.some((loc: any) => loc.id === eq.locationId)
        );
        return {
          ...client,
          headquarters: clientHeadquarters,
          locations: clientLocations,
          equipments: clientEquipments,
        };
      });

     /*  if (name || serial || model || type || brand) {
        // Hacer filter con linearDatap
        const dataEquipments = combinedResults.filter(
          (client: any) => client.equipments.length > 0
        );
        return {
          clients: dataEquipments,
          totalCount: dataEquipments.length,
          success: true,
        };
      } else {
        return {
          clients: combinedResults,
          totalCount: combinedResults.length,
          success: true,
        };
      } */
    }
    return {
      clients: combinedResults,
      totalCount: combinedResults.length,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getClientsServ = async (
  businessName?: string,
  nit?: string,
  address?: string,
  email?: string,
  phone?: string,
  addressh?: string,
  emailh?: string,
  phoneh?: string,
  city?: string,
  contact?: string,
  headName?: string,
  isPrincipal?: string,
  locationName?: string,
  name?: string,
  serial?: string,
  model?: string,
  type?: string,
  brand?: string
) => {
  try {
    //Filters
    let options: any | undefined = {};
    let optionh: any | undefined = {};
    let optionsl: any | undefined = {};
    let optionse: any | undefined = {};

    // Filter client propeties

    if (businessName != undefined) {
      options = {
        businessName: { [Sequelize.Op.iLike]: `${businessName}%` },
        status: false,
      };
    }
    if (nit != undefined) {
      options = {
        nit: { [Sequelize.Op.iLike]: `${nit}%` },
        status: false,
      };
    }
    if (address != undefined) {
      options = {
        address: { [Sequelize.Op.iLike]: `${address}%` },
        status: false,
      };
    }
    if (email != undefined) {
      options = {
        email: { [Sequelize.Op.iLike]: `${email}%` },
        status: false,
      };
    }
    if (phone != undefined) {
      options = {
        phone: { [Sequelize.Op.iLike]: `${phone}%` },
        status: false,
      };
    }
    if (city != undefined) {
      options = {
        city: { [Sequelize.Op.iLike]: `${city}%` },
        status: false,
      };
    }
    if (contact != undefined) {
      options = {
        contact: { [Sequelize.Op.iLike]: `${contact}%` },
        status: false,
      };
    }

    // Filter heaquarters propeties
    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.iLike]: `${headName}%` },
        status: false,
      };
    }

    if (addressh != undefined) {
      optionh = {
        address: { [Sequelize.Op.iLike]: `${addressh}%` },
        status: false,
      };
    }

    if (emailh != undefined) {
      optionh = {
        email: { [Sequelize.Op.iLike]: `${emailh}%` },
        status: false,
      };
    }

    if (phoneh != undefined) {
      optionh = {
        phone: { [Sequelize.Op.iLike]: `${phoneh}%` },
        status: false,
      };
    }

    const whereConditions: any = {};

    if (isPrincipal === "true") {
      whereConditions.isPrincipal = true;
      optionh = {
        isPrincipal: whereConditions.isPrincipal,
        status: false,
      };
    } else if (isPrincipal === "false") {
      whereConditions.isPrincipal = false;
      optionh = {
        isPrincipal: whereConditions.isPrincipal,
        status: false,
      };
    }

    // Filter location propeties

    if (locationName != undefined) {
      optionsl = {
        locationName: { [Sequelize.Op.iLike]: `${locationName}%` },
        status: false,
      };
    }

    // Filter equipment propeties

    if (name != undefined) {
      optionse = {
        name: { [Sequelize.Op.iLike]: `${name}%` },
        status: false,
      };
    }
    if (serial != undefined) {
      optionse = {
        serial: { [Sequelize.Op.iLike]: `${serial}%` },
        status: false,
      };
    }
    if (model != undefined) {
      optionse = {
        model: { [Sequelize.Op.iLike]: `${model}%` },
        status: false,
      };
    }
    if (type != undefined) {
      optionse = {
        type: { [Sequelize.Op.iLike]: `${type}%` },
        status: false,
      };
    }
    if (brand != undefined) {
      optionse = {
        brand: { [Sequelize.Op.iLike]: `${brand}%` },
        status: false,
      };
    }

    // Filter none params
    if (
      !businessName &&
      !nit &&
      !address &&
      !email &&
      !phone &&
      !addressh &&
      !emailh &&
      !phoneh &&
      !city &&
      !contact &&
      !headName &&
      !isPrincipal &&
      !locationName &&
      !name &&
      !serial &&
      !model &&
      !type &&
      !brand
    ) {
      options = { status: false };
    }

    // All query clients

    const clients = await Client.findAll({
      where: options,
      attributes: [
        "id",
        "businessName",
        "nit",
        "address",
        "email",
        "phone",
        "city",
        "contact",
        "user_app",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    // Obtén los resultados de Headquarter, Location y Equipment
    const headquarterIds = clients.map((client: any) => client.id);

    const headquarters = await Headquarter.findAll({
      where: { clientId: headquarterIds },
      optionh,
      attributes: [
        "id",
        "headName",
        "address",
        "email",
        "phone",
        "isPrincipal",
        "clientId",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const locationIds = headquarters.map((hq: any) => hq.id);

    const locations = await Location.findAll({
      where: {
        headquarterId: locationIds,
      },
      optionsl,
      attributes: ["id", "locationName", "headquarterId"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const equipment = await Equipment.findAll({
      where: optionse,
      attributes: [
        "id",
        "name",
        "description",
        "serial",
        "image",
        "model",
        "type",
        "brand",
        "locationId",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    // Combinar los resultados en un solo array de objetos
    const combinedResults = clients.map((client: any) => {
      const clientHeadquarters = headquarters.filter(
        (hq: any) => hq.clientId === client.id
      );
      const clientLocations = locations.filter((loc: any) =>
        clientHeadquarters.some((hq: any) => hq.id === loc.headquarterId)
      );
      const clientEquipments = equipment.filter((eq: any) =>
        clientLocations.some((loc: any) => loc.id === eq.locationId)
      );
      return {
        ...client,
        headquarters: clientHeadquarters,
        locations: clientLocations,
        equipments: clientEquipments,
      };
    });
    if (name || serial || model || type || brand) {
      // Hacer filter con linearDatap
      const dataEquipments = combinedResults.filter(
        (client: any) => client.equipments.length > 0
      );
      return {
        clients: dataEquipments,
        totalCount: dataEquipments.length,
        success: true,
      };
    } else {
      return {
        clients: combinedResults,
        totalCount: combinedResults.length,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

const getOneClientServ = async (client: any) => {
  try {
    const clientF = await Client.findOne({
      where: { id: client },
      attributes: [
        "id",
        "businessName",
        "nit",
        "address",
        "email",
        "phone",
        "city",
        "contact",
        "user_app",
      ],
      raw: true,
    });

    if (!clientF) {
      return {
        msg: "El cliente no existe...",
        success: false,
      };
    }
    // Obtén los resultados de Headquarter, Location y Equipment
    const headquarters = await Headquarter.findAll({
      where: { clientId: clientF.id },
      attributes: [
        "id",
        "headName",
        "address",
        "email",
        "phone",
        "isPrincipal",
        "clientId",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const locationIds = headquarters.map((hq: any) => hq.id);

    const locations = await Location.findAll({
      where: {
        headquarterId: locationIds,
      },

      attributes: ["id", "locationName", "headquarterId"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const equipment = await Equipment.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "serial",
        "image",
        "model",
        "type",
        "brand",
        "locationId",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    // Objeto combinado con la información del cliente y sus relaciones
    const combinedData = {
      client: clientF,
      headquarters: headquarters,
      locations: locations,
      equipments: equipment,
    };
    return {
      client: combinedData,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateClientServ = async (id: any, cli: any) => {
  const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
  let errorUsers = [];
  try {
    //Micro de auth
    const baseUrlPacth = `${URL}/user/update-user`;
    const { businessName, nit, address, email, phone, user_app } = cli;
    const clientFound = await Client.findOne({ where: { id } });
    if (!clientFound) {
      return {
        msg: "Cliente no encontrado",
        success: false,
      };
    }

    // verificar que el role_name sea diferente de cliente
    if (user_app.role_name !== "Cliente") {
      return {
        msg: "El rol debe ser Cliente...",
        success: false,
      };
    }

    const clientData = clientFound.get({ plain: true });
    const userArray = clientData.user_app;
    userArray.push(user_app);

    const [updateClient] = await Client.update(
      {
        businessName,
        nit,
        address,
        email,
        phone,
        user_app: userArray,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    if (updateClient <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }

    // Actualizacion del usuario llamando al micro de aut
    if (userArray.length > 0) {
      for (const { user_id } of userArray) {
        try {
          // Llamar al end-point que hace el patch de usuarios
          await axios.patch(`${baseUrlPacth}/${user_id}`, {
            clientId: clientData.id,
          });
        } catch (error) {
          errorUsers.push(error);
        }
      }
    }
    const client = await Client.findOne({ where: { id } });
    return {
      msg: "Cliente actualizado con exito...",
      client,
      success: true,
      usersErrors: errorUsers,
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
  getClientServPag,
  getClientsServ,
  getOneClientServ,
  updateClientServ,
  deleteClientServ,
};
