const Location = require("../models/location");
const Equipment = require("../models/equipment");
const Headquarters = require("../models/headquarter");
const Client = require("../models/client");


const newEquipmentServ = async (equip: any) => {
  try {

    const { name, description, serial, model, type, brand, locationId} = equip;
    const findLocation = await Location.findOne({
      where: { id: equip.locationId },
    });
    if (!findLocation) {
      return {
        msg: "La ubicación no existe...",
      };
    }
    const findEquipment = await Equipment.findOne({
      where: { serial: equip.serial },
    });
    if (findEquipment) {
      return {
        msg: "Este quipo ya esta registrado",
      };
    }

    const newEquipment = await Equipment.create({
      name,
      description,
      serial,
      model,
      type,
      brand,
      locationId
    });

    if (!newEquipment) {
      return {
        msg: "Error al registrar el equipo",
      };
    }

    return {
      msg: "Equipo registrado satisfactoriamente...",
      data: newEquipment,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getEquipmentServ = async () => {
  try {
    const equipments = await Equipment.findAll({
      where: { status: false },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Location,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          include: [
            {
              model: Headquarters,
              attributes: { exclude: ["id", "createdAt", "updatedAt", "status","isPrincipal"],},
              include: [
                {
                  model: Client,
                  attributes: { exclude: ["id", "createdAt", "updatedAt", "status"]},
                },
              ],
            },
          ],
        },
      ],
    });
    return {
      data: equipments
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getOneEquipmentServ = async (equip: any) => {
  try {
    const findEquipment = await Equipment.findOne({
      where: { id: equip },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Location,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          include: [
            {
              model: Headquarters,
              attributes: { exclude: ["id", "createdAt", "updatedAt", "status","isPrincipal"],},
              include: [
                {
                  model: Client,
                  attributes: { exclude: ["id", "createdAt", "updatedAt", "status"]},
                },
              ],
            },
          ],
        },
      ],
    });
    if (!findEquipment) {
      return {
        msg: "Esta equipo no existe",
      };
    }
    return {
      client: findEquipment,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const allEquipmentsLocationServ = async (user: any) => {
  try {
    const equipLocation = await Equipment.findAll({
      where: { locationId: user },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Location,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          include: [
            {
              model: Headquarters,
              attributes: { exclude: ["id", "createdAt", "updatedAt", "status","isPrincipal"],},
              include: [
                {
                  model: Client,
                  attributes: { exclude: ["id", "createdAt", "updatedAt", "status"]},
                },
              ],
            },
          ],
        },
      ],
    });
    if (!equipLocation) {
      return {
        msg: "Equipos no hay con este espacio",
        users: [],
      };
    }
    return { data: equipLocation, success: true };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateEquipmentServ = async (id: any, equip: any) => {
  try {
    const equipFound = await Equipment.findOne({ where: { id } });
    if (!equipFound) {
      return {
        msg: "Equipo no válido",
      };
    }
    const locationFound = await Location.findOne({
      where: { id: equip.locationId },
    });
    if (!locationFound) {
      return {
        msg: "Ubicación no válida",
      };
    }
    const [updateEquipment] = await Equipment.update(equip, {
      where: {
        id,
      },
      returning: true,
    });
    if (updateEquipment <= 0) {
      return {
        msg: "Actualización no realizada...",
        success: false,
      };
    }
    const equipment = await Equipment.findOne({ where: { id } });
    return {
      msg: "Equipo actualizado con exito...",
      data: equipment,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteEquipmentServ = async (id: any) => {
  try {
    const findEquipment = await Equipment.findOne({ where: { id } });

    if (findEquipment.dataValues.status) {
      return {
        msg: "El equipo ya fue retirado",
        success: false,
      };
    }
    const deletedEquipment = await Equipment.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
    if (!deletedEquipment) {
      return {
        msg: "No se pudo eliminar el equipo",
        success: false,
      };
    }
    return {
      msg: "Equipo eliminado con exito...",
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export {
  newEquipmentServ,
  getEquipmentServ,
  getOneEquipmentServ,
  allEquipmentsLocationServ,
  updateEquipmentServ,
  deleteEquipmentServ,
};
