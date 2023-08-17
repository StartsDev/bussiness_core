"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintByTechServ = exports.getMaintenancesServ = exports.createMaintenanceServ = void 0;
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
            where: { "tech.techId": tech.techId },
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt", "status", "tech"] },
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
