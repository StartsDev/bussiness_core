import { bulkCreatefunction } from "../utils/bulkCreate";

const Sequelize = require("sequelize");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
const Equipment = require("../models/equipment");

// Create a location
const createLocationServ = async (location: any) => {
  try {
    const findHeadquarter = await Headquarter.findOne({
      where: { id: location.headquarterId },
    });
    if (!findHeadquarter) {
      return {
        msg: "El Id de la sede no existe...",
      };
    }
    const findLocation = await Location.findOne({
      where: { locationName: location.locationName },
    });
    if (findLocation) {
      return {
        msg: "Esta ubicación ya existe",
      };
    }
    const newLocation = await Location.create(location);

    return {
      msg: "Ubicación registrada satisfactoriamente...",
      location: newLocation,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Get locations
const getLocationServPag = async (
  page?: number,
  pageSize?: number,
  locationName?: string,
  headName?: string,
  addressh?: string,
  emailh?: string,
  phoneh?: string,
  businessName?: string,
  nit?: string,
  city?: string,
  contact?: string,
  addressc?: string,
  emailc?: string,
  phonec?: string
) => {
  try {
    let locations;
    let totalPages = 0;
    // Options filter where clausule and counter
    let optionh: any | undefined = {};
    let optionsc: any | undefined = {};
    let options: any | undefined = {};
    const linearDatap: any[] = [];

    //Validation query params

    if (locationName != undefined) {
      options = {
        locationName: { [Sequelize.Op.like]: `${locationName}%` },
        status: false,
      };
    }

    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.like]: `${headName}%` },
        status: false,
      };
    }
    if (addressh != undefined) {
      optionh = {
        address: { [Sequelize.Op.like]: `${addressh}%` },
        status: false,
      };
    }
    if (emailh != undefined) {
      optionh = {
        email: { [Sequelize.Op.like]: `${emailh}%` },
        status: false,
      };
    }
    if (phoneh != undefined) {
      optionh = {
        phone: { [Sequelize.Op.like]: `${phoneh}%` },
        status: false,
      };
    }
    if (businessName != undefined) {
      optionsc = {
        businessName: { [Sequelize.Op.like]: `${businessName}%` },
        status: false,
      };
    }
    if (nit != undefined) {
      optionsc = {
        nit: { [Sequelize.Op.like]: `${nit}%` },
        status: false,
      };
    }
    if (city != undefined) {
      optionsc = {
        city: { [Sequelize.Op.like]: `${city}%` },
        status: false,
      };
    }
    if (contact != undefined) {
      optionsc = {
        contact: { [Sequelize.Op.like]: `${contact}%` },
        status: false,
      };
    }
    if (addressc != undefined) {
      optionsc = {
        address: { [Sequelize.Op.like]: `${addressc}%` },
        status: false,
      };
    }
    if (emailc != undefined) {
      optionsc = {
        email: { [Sequelize.Op.like]: `${emailc}%` },
        status: false,
      };
    }
    if (phonec != undefined) {
      optionsc = {
        phone: { [Sequelize.Op.like]: `${phonec}%` },
        status: false,
      };
    }
    if (
      !locationName &&
      !headName &&
      !addressh &&
      !emailh &&
      !phoneh &&
      !businessName &&
      !nit &&
      !city &&
      !contact &&
      !addressc &&
      !emailc &&
      !phonec
    ) {
      options = { status: false };
    }

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      locations = await Location.findAll({
        offset,
        limit: pageSize,
        where: options,
        attributes: { exclude: ["updatedAt", "status"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Headquarter,
            where: optionh,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
            include: [
              {
                model: Client,
                where: optionsc,
                attributes: {
                  exclude: ["id", "createdAt", "updatedAt", "status"],
                },
              },
            ],
          },
          {
            model: Equipment,
            as: "equipments",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt", "status"],
            },
          }
        ],
      });

      // Response serial data location
      const propertiesToHide = ["updatedAt", "status", "Client"];
      for (const location of locations) {
        const locationData = location.get({ plain: true });
        const headquarter = await Headquarter.findByPk(location.headquarterId, {
          include: [
            {
              model: Client,
              attributes: {
                exclude: ["updatedAt", "status"],
              },
            },
          ],
        });

        // Customization data location
        if (headquarter) {
          const client = headquarter.Client.get({ plain: true }); // Exclude property dataValues
          const sanitizedObject = { ...headquarter.get({ plain: true }) };
          propertiesToHide.forEach((property) => {
            delete sanitizedObject[property];
          });
          locationData.headquarter = sanitizedObject;
          locationData.client = client;
          delete locationData.Headquarter;
          linearDatap.push(locationData);
        }
      }
    }
    if (pageSize) {
      const totalLocations = await Location.count({
        where: options,
        include: [
          {
            model: Headquarter,
            where: optionh,
            include: [
              {
                model: Client,
                where: optionsc,
              },
            ],
          },
        ],
      });
      totalPages = Math.ceil(totalLocations / pageSize);
    }
    return {
      linearDatap,
      totalCountp: linearDatap.length,
      totalPages,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Not pagination location
const getLocationsServ = async (
  locationName?: string,
  headName?: string,
  addressh?: string,
  emailh?: string,
  phoneh?: string,
  businessName?: string,
  nit?: string,
  city?: string,
  contact?: string,
  addressc?: string,
  emailc?: string,
  phonec?: string
) => {
  try {
    let optionh: any | undefined = {};
    let optionsc: any | undefined = {};
    let options: any | undefined = {};

    //Validation query params

    if (locationName != undefined) {
      options = {
        locationName: { [Sequelize.Op.iLike]: `${locationName}%` },
        status: false,
      };
    }

    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.iLike]: `${headName}%` },
        status: false,
      };
    }
    if (addressh != undefined) {
      optionh = {
        address: { [Sequelize.Op.like]: `${addressh}%` },
        status: false,
      };
    }
    if (emailh != undefined) {
      optionh = {
        email: { [Sequelize.Op.like]: `${emailh}%` },
        status: false,
      };
    }
    if (phoneh != undefined) {
      optionh = {
        phone: { [Sequelize.Op.like]: `${phoneh}%` },
        status: false,
      };
    }
    if (businessName != undefined) {
      optionsc = {
        businessName: { [Sequelize.Op.iLike]: `${businessName}%` },
        status: false,
      };
    }
    if (nit != undefined) {
      optionsc = {
        nit: { [Sequelize.Op.like]: `${nit}%` },
        status: false,
      };
    }
    if (city != undefined) {
      optionsc = {
        city: { [Sequelize.Op.like]: `${city}%` },
        status: false,
      };
    }
    if (contact != undefined) {
      optionsc = {
        contact: { [Sequelize.Op.like]: `${contact}%` },
        status: false,
      };
    }
    if (addressc != undefined) {
      optionsc = {
        address: { [Sequelize.Op.like]: `${addressc}%` },
        status: false,
      };
    }
    if (emailc != undefined) {
      optionsc = {
        email: { [Sequelize.Op.like]: `${emailc}%` },
        status: false,
      };
    }
    if (phonec != undefined) {
      optionsc = {
        phone: { [Sequelize.Op.like]: `${phonec}%` },
        status: false,
      };
    }
    if (
      !locationName &&
      !headName &&
      !addressh &&
      !emailh &&
      !phoneh &&
      !businessName &&
      !nit &&
      !city &&
      !contact &&
      !addressc &&
      !emailc &&
      !phonec
    ) {
      options = { status: false };
    }

    // Get locations sequelize method using includes
    const locations = await Location.findAll({
      where: options,
      attributes: {
        exclude: ["updatedAt", "status"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Headquarter,
          where: optionh,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "status", "clientId"],
          },
          include: [
            {
              model: Client,
              where: optionsc,
              attributes: {
                exclude: ["id", "createdAt", "updatedAt", "status"],
              },
            },
          ],
        },
        {
          model: Equipment,
          as: "equipments",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "status"],
          },
        }
      ],
    });

    // Response serial data location
    const linearData: any[] = [];
    const propertiesToHide = ["createdAt", "updatedAt", "status", "Client"];
    for (const location of locations) {
      const locationData = location.get({ plain: true });
      const headquarter = await Headquarter.findByPk(location.headquarterId, {
        include: [
          {
            model: Client,
            attributes: {
              exclude: ["createdAt", "updatedAt", "status"],
            },
          },
        ],
      });

      // Customization data location
      if (headquarter) {
        const client = headquarter.Client.get({ plain: true }); // Exclude property dataValues
        const sanitizedObject = { ...headquarter.get({ plain: true }) };
        propertiesToHide.forEach((property) => {
          delete sanitizedObject[property];
        });
        locationData.headquarter = sanitizedObject;
        locationData.client = client;
        delete locationData.Headquarter;
        linearData.push(locationData);
      }
    }

    return {
      linearData,
      totalCount: linearData.length,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Get one location
const getOneLocationServ = async (location: any) => {
  try {
    const locationFound = await Location.findOne({
      where: { id: location },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Headquarter,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          include: [
            {
              model: Client,
              attributes: {
                exclude: ["id", "createdAt", "updatedAt", "status"],
              },
            },
          ],
        },
      ],
    });
    if (!locationFound) {
      return {
        msg: "Esta ubicación no existe",
        success: false,
      };
    }
    return {
      locationFound,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Get locations by headquarter
const allLocationsHeadServ = async (
  location: any,
  page?: number,
  pageSize?: number,
  locationName?: string
) => {
  try {
    let locations;
    let totalPages = 0;
    let options: any | undefined = {};

    if (locationName != undefined) {
      options = {
        locationName: { [Sequelize.Op.iLike]: `${locationName}%` },
        status: false,
      };
    }
    if (!locationName) {
      options = { status: false };
    }
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      locations = await Location.findAll({
        offset,
        limit: pageSize,
        where: { headquarterId: location }, options,
        attributes: { exclude: ["updatedAt", "status"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Headquarter,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          },
        ],
      });
      if (!locations) {
        return {
          msg: "Lugares no hay con esta sede",
          success: false,
        };
      }
      // Get total Pages and totalCount
      const totalLocations = await Location.count({
        where: { headquarterId: location }, options,

      });
      totalPages = Math.ceil(totalLocations / pageSize);

      return {
        locations,
        totalCount: locations.length,
        totalPages,
        success: true,
      };
    } else {
      locations = await Location.findAll({
        where: { headquarterId: location }, options,
        attributes: { exclude: ["updatedAt", "status"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Headquarter,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          },
        ],
      });
      if (!locations) {
        return {
          msg: "Lugares no hay con esta sede",
          success: false,
        };
      }
      return {
        locations,
        totalCount: locations.length,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

// Update location
const updateLocationServ = async (id: any, locat: any) => {
  try {
    const locationFound = await Location.findOne({ where: { id } });
    if (!locationFound) {
      return {
        msg: "Ubicación no válida",
      };
    }
    const headFound = await Headquarter.findOne({
      where: { id: locat.headquarterId },
    });
    if (!headFound) {
      return {
        msg: "Sede no válida",
      };
    }
    const [updateLocation] = await Location.update(locat, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateLocation <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const location = await Location.findOne({ where: { id } });
    return {
      msg: "Sede actualizada con exito...",
      location,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Delete location
const deleteLocationServ = async (id: any) => {
  try {
    const findLocation = await Location.findOne({ where: { id } });
    if (findLocation.dataValues.status) {
      return {
        msg: "La ubicación no válida",
      };
    }
    const deletedLocation = await Location.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
    if (!deletedLocation) {
      return {
        msg: "Ubicación no válida",
      };
    }
    return {
      msg: "Ubicación eliminada con exito...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const bulkCreateLocations = async (data: Array<{}>) => {
  try {
    await bulkCreatefunction(Location, data);
    return "Ubicaciones Creados";
  } catch (error) {
    console.log(error);
    return {
      message: "hubo un error en la creacion",
      success: false,
    };
  }
};

export {
  createLocationServ,
  getLocationServPag,
  getLocationsServ,
  getOneLocationServ,
  allLocationsHeadServ,
  updateLocationServ,
  deleteLocationServ,
  bulkCreateLocations,
};
