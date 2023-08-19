const Location = require("../models/location");
const Equipment = require("../models/equipment");
const Headquarters = require("../models/headquarter");
const Client = require("../models/client");

const newEquipmentServ = async (equip: any) => {
  try {
    const { name, description, serial, model, type, brand, locationId } = equip;
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
      locationId,
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

const getEquipmentServ = async (page?: number, pageSize?: number) => {
  try {
    let equipments;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      equipments = await Equipment.findAll({
        offset,
        limit: pageSize,
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Location,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
            include: [
              {
                model: Headquarters,
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "status",
                    "isPrincipal",
                  ],
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
      });
      const totalCount = await Equipment.count({ where: { status: false } });
      return {
        equipments,
        totalCount,
        success: true,
      };
    } else {
      equipments = await Equipment.findAll({
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Location,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
            include: [
              {
                model: Headquarters,
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "status",
                    "isPrincipal",
                  ],
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
      });
      const totalCount = await Equipment.count({ where: { status: false } });
      return {
        equipments,
        totalCount,
        success: true,
      };
    }
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
              attributes: {
                exclude: [
                  "id",
                  "createdAt",
                  "updatedAt",
                  "status",
                  "isPrincipal",
                ],
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
    });
    if (!findEquipment) {
      return {
        msg: "Esta equipo no existe",
        success: false,
      };
    }
    return {
      findEquipment,
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const allEquipmentsLocationServ = async (
  user: any,
  page?: number,
  pageSize?: number
) => {
  try {
    let equipLocation;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      equipLocation = await Equipment.findAll({
        offset,
        limit: pageSize,
        where: { locationId: user },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Location,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
            include: [
              {
                model: Headquarters,
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "status",
                    "isPrincipal",
                  ],
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
      });
      if (!equipLocation) {
        return {
          msg: "Equipos no hay con este espacio",
          succes: false,
        };
      }
      const totalCount = await Equipment.count({ where: { status: false } });
      return { equipLocation, totalCount, success: true };
    } else {
      equipLocation = await Equipment.findAll({
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
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "status",
                    "isPrincipal",
                  ],
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
      });
      if (!equipLocation) {
        return {
          msg: "Equipos no hay con este espacio",
          success:false
        };
      }
      const totalCount = await Equipment.count({ where: { status: false } });
      return { equipLocation, totalCount, success: true };
    }
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
