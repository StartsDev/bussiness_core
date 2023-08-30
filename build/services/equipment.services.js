"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreateEquipments = exports.deleteEquipmentServ = exports.updateEquipmentServ = exports.allEquipmentsLocationServ = exports.getOneEquipmentServ = exports.getEquipmentServ = exports.newEquipmentServ = void 0;
const bulkCreate_1 = require("../utils/bulkCreate");
const Sequelize = require("sequelize");
const Location = require("../models/location");
const Equipment = require("../models/equipment");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
const newEquipmentServ = async (equip) => {
    try {
        const { name, description, serial, model, type, brand, locationId } = equip;
        const findLocation = await Location.findOne({
            where: { id: locationId },
        });
        if (!findLocation) {
            return {
                msg: "La ubicación no existe...",
                success: false,
            };
        }
        const findEquipment = await Equipment.findOne({
            where: { serial: equip.serial },
        });
        if (findEquipment) {
            return {
                msg: "Este equipo ya esta registrado",
                success: false,
            };
        }
        const headId = findLocation.dataValues.headquarterId;
        const locationName = findLocation.dataValues.locationName;
        const findHead = await Headquarter.findOne({
            where: { id: headId },
        });
        if (!findHead) {
            return {
                msg: "La sede no existe con esta ubicación...",
                success: false,
            };
        }
        const clientId = findHead.dataValues.clientId;
        const headName = findHead.dataValues.headName;
        const findClient = await Client.findOne({
            where: { id: clientId },
        });
        if (!findClient) {
            return {
                msg: "Cliente no registrado ...",
                success: false,
            };
        }
        const customerId = findClient.dataValues.id;
        const clientName = findClient.dataValues.businessName;
        const newEquipment = await Equipment.create({
            name,
            description,
            serial,
            model,
            type,
            brand,
            location: {
                locationId,
                locationName,
            },
            headquarter: {
                headId,
                headName,
            },
            client: {
                clientId: customerId,
                clientName,
            },
            locationId,
        });
        if (!newEquipment) {
            return {
                msg: "Error al registrar el equipo",
            };
        }
        return {
            msg: "Equipo registrado satisfactoriamente...",
            newEquipment,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.newEquipmentServ = newEquipmentServ;
/* const getEquipmentServPag = async (
  page?: number,
  pageSize?: number,
  locationId?: string,
  headId?: string,
  clientId?: string) => {
  try{
    let equipments;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      offset,
      limit: pageSize,
    }
  }catch(e){
    throw new Error(e as string);
  }
} */
// Service get equipment without pagination
const getEquipmentServ = async (locationName, headName, businessName) => {
    try {
        // Options filter where clausule and counter
        let totalCount = 0;
        let optionl = {};
        let optionh = {};
        let optionsc = {};
        let options = {};
        const linearDatap = [];
        //Validation query params
        if (locationName != undefined) {
            optionl = {
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
        if (businessName != undefined) {
            optionsc = {
                businessName: { [Sequelize.Op.like]: `${businessName}%` },
                status: false,
            };
        }
        if (!locationName && !headName && !businessName) {
            options = { status: false };
        }
        const equipments = await Equipment.findAll({
            where: options,
            attributes: { exclude: ["updatedAt", "locationId", "status"] },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Location,
                    where: optionl,
                    attributes: { exclude: ["createdAt", "updatedAt", "status", "description", "headquarterId"] },
                    include: [
                        {
                            model: Headquarter,
                            where: optionh,
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "clientId", "status", "email", "phone", "address", "isPrincipal"],
                            },
                            include: [
                                {
                                    model: Client,
                                    where: optionsc,
                                    attributes: {
                                        exclude: ["createdAt", "updatedAt", "status", "nit", "address", "email", "phone", "city", "contact"],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        // Iteration equipments array and add format response
        for (const equipment of equipments) {
            const equipmentData = equipment.get({ plain: true });
            const location = equipment.Location;
            const headquarter = location.Headquarter;
            const client = headquarter.Client;
            equipmentData.location = location.get({ plain: true });
            equipmentData.headquarter = headquarter.get({ plain: true });
            equipmentData.client = client.get({ plain: true });
            delete equipmentData.Location;
            delete equipmentData.location.Headquarter;
            delete equipmentData.headquarter.Client;
            linearDatap.push(equipmentData);
        }
        // Counter data validation query cases
        totalCount = await Equipment.count({
            where: options,
            include: [
                {
                    model: Location,
                    where: optionl,
                    required: true,
                    include: [
                        {
                            model: Headquarter,
                            where: optionh,
                            required: true,
                            include: [
                                {
                                    model: Client,
                                    where: optionsc,
                                    required: true
                                }
                            ]
                        }
                    ]
                },
            ],
        });
        return {
            equipments: linearDatap,
            totalCount,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getEquipmentServ = getEquipmentServ;
const getOneEquipmentServ = async (equip) => {
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
                            model: Headquarter,
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
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getOneEquipmentServ = getOneEquipmentServ;
const allEquipmentsLocationServ = async (user, page, pageSize) => {
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
                                model: Headquarter,
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
        }
        else {
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
                                model: Headquarter,
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
                    success: false,
                };
            }
            const totalCount = await Equipment.count({ where: { status: false } });
            return { equipLocation, totalCount, success: true };
        }
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.allEquipmentsLocationServ = allEquipmentsLocationServ;
const updateEquipmentServ = async (id, equip) => {
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
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.updateEquipmentServ = updateEquipmentServ;
const deleteEquipmentServ = async (id) => {
    try {
        const findEquipment = await Equipment.findOne({ where: { id } });
        if (findEquipment.dataValues.status) {
            return {
                msg: "El equipo ya fue retirado",
                success: false,
            };
        }
        const deletedEquipment = await Equipment.update({ status: true }, {
            where: {
                id,
            },
        });
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
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteEquipmentServ = deleteEquipmentServ;
const bulkCreateEquipments = async (data) => {
    try {
        await (0, bulkCreate_1.bulkCreatefunction)(Equipment, data);
        return 'Equipos Creados';
    }
    catch (error) {
        console.log(error);
        return {
            message: 'hubo un error en la creacion',
            success: false,
        };
    }
};
exports.bulkCreateEquipments = bulkCreateEquipments;
