"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintenancesServ = exports.createMaintenanceServ = void 0;
const Equipment = require("../models/equipment");
const Maintenance = require("../models/maintenance");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
// Create a manteinance
const createMaintenanceServ = async (maint) => {
    try {
        const { activities, voltage_on_L1L2, voltage_on_L1L3, voltage_on_L2L3, suction_pressure, amp_engine_1, amp_engine_2, amp_engine_3, discharge_pressure, service_hour, service_date, photos, customer_sign, tech_sign, customerId, observations, equipmentId, techId, techName, techNumId, } = maint;
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
    }
    catch (error) {
        console.log(error);
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
