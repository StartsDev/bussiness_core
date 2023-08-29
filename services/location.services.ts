import { bulkCreatefunction } from "../utils/bulkCreate";

const Sequelize = require("sequelize");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");

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

//Pagination
const getLocationServPag = async (
  page?: number,
  pageSize?: number,
  headName?: string,
  businessName?: string
) => {
  try {
    let locations;

    // Options filter where clausule and counter
    
    let totalCountp: number = 0;
    let optionh: any | undefined = {};
    let optionsc: any | undefined = {};
    let options: any | undefined = {};
    const linearDatap: any[] = [];

    //Validation query params
    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.like]: `${headName}%` },
        status: false,
      };
    }
    if (businessName != undefined) {
      optionsc = {
        businessName: { [Sequelize.Op.like]: `${businessName}%` },
        status: false,
      };
    }
    if (!headName && !businessName) {
      options = { status: false };
    }

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      locations = await Location.findAll({
        offset,
        limit: pageSize,
        where: options,
        attributes: { exclude: ["updatedAt"] },
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
        ],
      });

      // Response serial data location
      const propertiesToHide = [
        "createdAt",
        "updatedAt",
        "clientId",
        "status",
        "isPrincipal",
        "Client",
        "address",
        "email",
        "phone",
      ];
      for (const location of locations) {
        const locationData = location.get({ plain: true });
        const headquarter = await Headquarter.findByPk(location.headquarterId, {
          include: [
            {
              model: Client,
              attributes: {
                exclude: [
                  "nit",
                  "email",
                  "phone",
                  "createdAt",
                  "updatedAt",
                  "status",
                  "city",
                  "address",
                  "contact",
                ],
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

       // Counter data validation query cases
      if (headName != undefined) {
        totalCountp = await Location.count({
          where: { status: false },
          include: [
            {
              model: Headquarter,
              where: { headName: { [Sequelize.Op.like]: `${headName}%` } },
              required: true,
            },
          ],
        });
      }

      if (businessName != undefined) {
        totalCountp = await Location.count({
          where: { status: false },
          include: [
            {
              model: Headquarter,
              required: true,
              include: [
                {
                  model: Client,
                  where: {
                    businessName: { [Sequelize.Op.like]: `${businessName}%` },
                  },
                  required: true,
                },
              ],
            },
          ],
        });
      }

      if (headName && businessName) {
        totalCountp = await Location.count({
          where: { status: false },
          include: [
            {
              model: Headquarter,
              where: {
                headName: { [Sequelize.Op.like]: `${headName}%` },
              },
              required: true,
              include: [
                {
                  model: Client,
                  where: {
                    businessName: { [Sequelize.Op.like]: `${businessName}%` },
                  },
                  required: true,
                },
              ],
            },
          ],
        });
      }

      if (!headName && !businessName) {
        totalCountp = await Location.count({ where: { status: false } });
      }
    }

    return {
      linearDatap,
      totalCountp,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//No pagination
const getLocationsServ = async (headName?: string, businessName?: string) => {
  try {
    let totalCount: number = 0;
    let optionh: any | undefined = {};
    let optionsc: any | undefined = {};
    let options: any | undefined = {};
    //Validation query params
    if (headName != undefined) {
      optionh = {
        headName: { [Sequelize.Op.like]: `${headName}%` },
        status: false,
      };
    }
    if (businessName != undefined) {
      optionsc = {
        businessName: { [Sequelize.Op.like]: `${businessName}%` },
        status: false,
      };
    }
    if (!headName && !businessName) {
      options = { status: false };
    }

    // Get locations sequelize method using includes
    const locations = await Location.findAll({
      where: options,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description", "status"],
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
      ],
    });

    // Response serial data location
    const linearData: any[] = [];
    const propertiesToHide = [
      "createdAt",
      "updatedAt",
      "clientId",
      "status",
      "isPrincipal",
      "Client",
      "address",
      "email",
      "phone",
    ];
    for (const location of locations) {
      const locationData = location.get({ plain: true });
      const headquarter = await Headquarter.findByPk(location.headquarterId, {
        include: [
          {
            model: Client,
            attributes: {
              exclude: [
                "nit",
                "email",
                "phone",
                "createdAt",
                "updatedAt",
                "status",
                "city",
                "address",
                "contact",
              ],
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

    // Counter data validation query cases
    if (headName != undefined) {
      totalCount = await Location.count({
        where: { status: false },
        include: [
          {
            model: Headquarter,
            where: { headName: { [Sequelize.Op.like]: `${headName}%` } },
            required: true,
          },
        ],
      });
    }

    if (businessName != undefined) {
      totalCount = await Location.count({
        where: { status: false },
        include: [
          {
            model: Headquarter,
            required: true,
            include: [
              {
                model: Client,
                where: {
                  businessName: { [Sequelize.Op.like]: `${businessName}%` },
                },
                required: true,
              },
            ],
          },
        ],
      });
    }

    if (headName && businessName) {
      totalCount = await Location.count({
        where: { status: false },
        include: [
          {
            model: Headquarter,
            where: {
              headName: { [Sequelize.Op.like]: `${headName}%` },
            },
            required: true,
            include: [
              {
                model: Client,
                where: {
                  businessName: { [Sequelize.Op.like]: `${businessName}%` },
                },
                required: true,
              },
            ],
          },
        ],
      });
    }

    if (!headName && !businessName) {
      totalCount = await Location.count({ where: { status: false } });
    }

    return {
      linearData,
      totalCount,
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
  pageSize?: number
) => {
  try {
    let locations;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      locations = await Location.findAll({
        offset,
        limit: pageSize,
        where: { headquarterId: location },
        attributes: { exclude: ["updatedAt"] },
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
      const totalCount = await Client.count();

      return {
        locations,
        totalCount,
        success: true,
      };
    } else {
      locations = await Location.findAll({
        where: { headquarterId: location },
        attributes: { exclude: ["updatedAt"] },
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
      const totalCount = await Client.count();

      return {
        locations,
        totalCount,
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
    await bulkCreatefunction(Location, data)
    return 'Ubicaciones Creados'
  } catch (error) {
    console.log(error);
    return {
      message: 'hubo un error en la creacion',
      success: false,
  }
}
}


export {
  createLocationServ,
  getLocationServPag,
  getLocationsServ,
  getOneLocationServ,
  allLocationsHeadServ,
  updateLocationServ,
  deleteLocationServ,
  bulkCreateLocations
};
