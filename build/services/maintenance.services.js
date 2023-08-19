"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenanceServ = exports.updateMaintenanceServ = exports.getMaintByIdServ = exports.getMainByEquipment = exports.getMaintByClientServ = exports.getMaintByTechServ = exports.getMaintenancesServ = exports.createMaintenanceServ = void 0;
const Equipment = require("../models/equipment");
const Maintenance = require("../models/maintenance");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
// Create a manteinance
const createMaintenanceServ = async (maint) => {
    try {
        const { activities, voltage_on_L1L2, voltage_on_L1L3, voltage_on_L2L3, suction_pressure, amp_engine_1, amp_engine_2, amp_engine_3, discharge_pressure, service_hour, service_date, photos, customer_sign, tech_sign, customerId, observations, equipmentId, techId, techName, techNumId, } = maint;
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
        if (!(client &&
            client.dataValues.headquarters.length > 0 &&
            client.dataValues.headquarters[0].locations.length > 0)) {
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
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createMaintenanceServ = createMaintenanceServ;
// Get maintenances
const getMaintenancesServ = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize;
        const maintenances = await Maintenance.findAll({
            offset,
            limit: pageSize,
            where: { delete: false },
            attributes: { exclude: ["updatedAt"] },
            order: [["createdAt", "DESC"]],
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
        const totalCount = await Maintenance.count({ where: { delete: false } });
        return {
            maintenances,
            totalCount,
            success: true,
        };
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.getMaintenancesServ = getMaintenancesServ;
// Get maintenance by tech (Home)
const getMaintByTechServ = async (tech) => {
    try {
        const maintenanceTech = await Maintenance.findAll({
            where: { "tech.techId": tech.techId, delete: false },
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
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getMaintByTechServ = getMaintByTechServ;
// Get maintenance by client
const getMaintByClientServ = async (client) => {
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
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getMaintByClientServ = getMaintByClientServ;
// Get maintenance by equipment
const getMainByEquipment = async (equip) => {
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
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.getMainByEquipment = getMainByEquipment;
// Get one maintenance by id
const getMaintByIdServ = async (maint) => {
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
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getMaintByIdServ = getMaintByIdServ;
// Update maintenance
const updateMaintenanceServ = async (id, maint) => {
    try {
        // Validate maintenance
        const maintFound = await Maintenance.findOne({ where: { id } });
        if (!maintFound) {
            return {
                msg: "Mantenimiento no válido",
                success: false,
            };
        }
        // Validate Maintenance state & user autorization role
        if (maintFound.dataValues.status === "En proceso" &&
            maint.rolName != "Tecnico" &&
            maint.rolName != "Super_Usuario") {
            return {
                msg: "El administrador no puede modificar un mantenimiento en proceso",
                success: false,
            };
        }
        if (maintFound.dataValues.status === "Completado" &&
            maint.rolName != "Administrador" &&
            maint.rolName != "Super_Usuario") {
            return {
                msg: "El técnico no puede modificar un mantenimiento completado",
                success: false,
            };
        }
        if (maintFound.dataValues.status === "Confirmado") {
            return {
                msg: "No es posible actualizar un mantenimiento confirmado",
                success: false,
            };
        }
        // Validate client
        const clientFound = await Client.findOne({
            where: { id: maint.customerId },
        });
        if (!clientFound) {
            return {
                msg: "Cliente no registado",
                success: false,
            };
        }
        // Validate equipment
        const equipFound = await Equipment.findOne({
            where: { id: maint.equipmentId },
        });
        if (!equipFound) {
            return {
                msg: "Equipo no registado",
                success: false,
            };
        }
        // Update maintenance
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
        // Return maintenace updated
        const maintenance = await Maintenance.findOne({ where: { id } });
        if (!updateMaintenance) {
            return {
                msg: "Actualización no es correcta",
                success: false,
            };
        }
        return {
            msg: "Mantenimiento actualizado...",
            maintenance,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.updateMaintenanceServ = updateMaintenanceServ;
// Delete maintenance
const deleteMaintenanceServ = async (id) => {
    try {
        const findMaint = await Maintenance.findOne({ where: { id } });
        if (findMaint.dataValues.delete) {
            return {
                msg: "Mantenimiento no registrado",
                success: false,
            };
        }
        if (findMaint.dataValues.status === "Confirmado") {
            return {
                msg: "No es posible eliminar un mantenimiento confirmado",
                success: false,
            };
        }
        const deletedMaintenance = await Maintenance.update({ delete: true }, {
            where: {
                id,
            },
        });
        if (!deletedMaintenance) {
            return {
                msg: "No se pudo eliminar el mantenimiento",
                success: false,
            };
        }
        return {
            msg: "Mantenimiento eliminado con exito...",
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteMaintenanceServ = deleteMaintenanceServ;
