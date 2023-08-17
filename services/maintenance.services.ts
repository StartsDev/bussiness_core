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

    const findEquipment = await Equipment.findOne({
      where: { id: equipmentId },
    });

    if (!findEquipment) {
      return {
        msg: "El equipo no está registrado...",
        success: false,
      };
    }

    const client = await Client.findByPk(customerId, {
      include: {
        model: Headquarter,
        as: "headquarters",
        include: {
          model: Location,
          as: "locations",
          include: {
            model: Equipment,
            as: "equipments",
            where: { id: equipmentId },
          },
        },
      },
    });

    if (
      !(
        client &&
        client.dataValues.headquarters.length > 0 &&
        client.dataValues.headquarters[0].locations.length > 0
      )
    ) {
      return {
        msg: "EL equipo no le pertenece al cliente...",
        success: false,
      };
    }

    const customer = {
      id: client.dataValues.id,
      businessName: client.dataValues.businessName,
      nit: client.dataValues.nit,
      address: client.dataValues.address,
      email: client.dataValues.email,
      phone: client.dataValues.phone,
    };

    const findMaintenance = await Maintenance.findOne({
      where: { service_hour },
    });

    if (findMaintenance) {
      return {
        msg: "Ya existe un servicio registrado a esa hora...",
        success: false,
      };
    }

    const maintenance = await Maintenance.create({
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
      customerId,
      photos,
      tech: {
        techId,
        techName,
        techNumId,
      },
      observations,
      equipmentId,
    });

    return {
      msg: "Servicio registrado satisfactoriamente...",
      maintenance,
      customer,
      success: true,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

// Get maintenances
const getMaintenancesServ = async () => {
  try {
    const maintenances = await Maintenance.findAll({
      where: { delete: false },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
const getMaintByTechServ = async (tech: any) => {
  try {
    const maintenanceTech = await Maintenance.findAll({
      where: { "tech.techId": tech.techId },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "tech"] },
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
    if (!maintenanceTech) {
      return {
        msg: "No hay mantenimientos registrados para este usuario...",
        success: false,
      };
    }
    return {
      maintenanceTech,
      success: true,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

// Get maintenance by client
const getMaintByClientServ = async (client: any) => {
  try {
    const clientFound = await Client.findOne({
      where: { id: client.customId },
    });
    if (!clientFound) {
      return {
        msg: "El cliente no esta registrado...",
        success: false,
      };
    }
    const maintClient = await Maintenance.findAll({
      where: { customerId: clientFound.dataValues.id },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "delete"] },
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
    if (!maintClient) {
      return {
        msg: "No hay mantenimientos registrados para este cliente...",
        success: false,
      };
    }

    return {
      maintClient,
      success: true,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

// Get maintenance by equipment
const getMainByEquipment = async (equip: any) => {
  try {
    const equipment = await Equipment.findOne({
      where: { id: equip.equipmentId },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "status"] },
      include: {
        model: Maintenance,
        as: "maintenances",
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt", "delete"] },
      },
    });
    if (!equipment) {
      return {
        msg: "El equipo no esta registrado...",
        success: false,
      };
    }
    return { equipment, success: true };
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
};

// Get one maintenance by id
const getMaintByIdServ = async (maint: any) => {
  try {
    const maintenance = await Maintenance.findOne({
      where: { id: maint.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
    if (!maintenance) {
      return {
        msg: "Mantenimiento no registrado",
        success: false,
      };
    }
    return { maintenance, succes: true };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Update maintenance
const updateMaintenanceServ = async (id: any, maint: any) => {
  try {
    const maintFound = await Maintenance.findOne({ where: { id } });
    if (!maintFound) {
      return {
        msg: "Mantenimiento no válido",
        success: false,
      };
    }
    const clientFound = await Client.findOne({
      where: { id: maint.customerId },
    });
    if (!clientFound) {
      return {
        msg: "Cliente no registado",
        success: false,
      };
    }
    const equipFound = await Equipment.findOne({
      where: { id: maint.equipmentId },
    });
    if (!equipFound) {
      return {
        msg: "Equipo no registado",
        success: false,
      };
    }
    const [updateMaintenance] = await Maintenance.update(maint, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateMaintenance <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const maintenance = await Maintenance.findOne({ where: { id } });
    if (!updateMaintenance) {
      return {
        msg: "Actualización no es correcta",
        success: false
      };
    }
    return {
      msg: "Mantenimiento actualizado...",
      maintenance,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

// Delete maintenance


/* 


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
  getMaintByTechServ,
  getMaintByClientServ,
  getMainByEquipment,
  getMaintByIdServ,
  updateMaintenanceServ,
  /* 
  deleteLocationServ, */
};
