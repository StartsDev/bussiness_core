const Equipment = require("../models/equipment");
const Maintenance = require("../models/maintenance");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");

// Create a manteinance
const createMaintenanceServ = async (maint: any) => {
  try {
    const {
      activities,
      voltage_on_L1L2,
      voltage_on_L1L3,
      voltage_on_L2L3,
      suction_pressure,
      amp_engine_1,
      amp_engine_2,
      amp_engine_3,
      discharge_pressure,
      service_hour,
      service_date,
      photos,
      customer_sign,
      tech_sign,
      customerId,
      observations,
      equipmentId,
      techId,
      techName,
      techNumId,
    } = maint;

    const client = await Client.findOne({
      where: { id: customerId },
    });

    if (!client) {
      return {
        msg: "El Id del cliente no existe...",
        success: false,
      };
    }

    const findEquipment = await Equipment.findOne({
      where: { id: equipmentId },
    });

    if (!findEquipment) {
      return {
        msg: "El Id del equipo no existe...",
        success: false,
      };
    }

    const findMaintenance = await Maintenance.findOne({
      where: { service_hour },
    });

    if (findMaintenance) {
      return {
        error: "Ya existe un servicio registrado a esa hora...",
        success: false,
      };
    }

    const newMaintenance = new Maintenance({
      activities,
      voltage_on_L1L2,
      voltage_on_L1L3,
      voltage_on_L2L3,
      suction_pressure,
      amp_engine_1,
      amp_engine_2,
      amp_engine_3,
      discharge_pressure,
      service_hour,
      service_date,
      customer_sign,
      tech_sign,
      photos,
      techId,
      customerId,
      observations,
      equipmentId,
    });
    await newMaintenance.save();

    return {
      msg: "Servicio registrado satisfactoriamente...",
      data: { newMaintenance, techName, techNumId },
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

// Get maintenances
const getMaintenancesServ = async () => {
  try {
    const maintenances = await Maintenance.findAll({
      where: { delete: false },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "status"] },
      include: [
        {
          model: Equipment,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          include: [
            {
              model: Location,
              attributes: {
                exclude: ["id", "createdAt", "updatedAt", "status"],
              },
              include: [
                {
                  model: Headquarter,
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt", "status"],
                  },
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
            },
          ],
        },
      ],
    });
    return {
      data: maintenances,
    };
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
};

// Get maintenance by tech (Home)

/* 
// Get one location
const getOneLocationServ = async (location: any) => {
  try {
    const findHead = await Location.findOne({
      where: { id: location },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Headquarters,
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
    if (!location) {
      return {
        msg: "Esta ubicación no existe",
      };
    }
    return {
      client: findHead,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

//Get locations by headquarter
const allLocationsHeadServ = async (location: any) => {
  try {
    const locationHead = await Location.findAll({
      where: { headquarterId: location },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Headquarters,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
        },
      ],
    });
    if (!locationHead) {
      return {
        msg: "Lugares no hay con esta sede",
        users: [],
      };
    }
    return { data: locationHead };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Update location
const updateLocationServ = async (id: any, location: any) => {
  try {
    const locationFound = await Location.findOne({ where: { id } });
    if (!locationFound) {
      return {
        msg: "Ubicación no válida",
      };
    }
    const headFound = await Headquarters.findOne({
      where: { id: location.headquarterId },
    });
    if (!headFound) {
      return {
        msg: "Sede no válida",
      };
    }
    const [updateLocation] = await Location.update(location, {
      where: {
        id,
      },
      returning: true,
    });
    if (!updateLocation) {
      return {
        msg: "Actualización no es correcta",
      };
    }
    return {
      msg: "Sede actualizada con exito...",
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
 */
export {
  createMaintenanceServ,
  getMaintenancesServ,
  /*   getLocationsServ,
  getOneLocationServ,
  allLocationsHeadServ,
  updateLocationServ,
  deleteLocationServ, */
};
