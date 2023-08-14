"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaintenanceServ = void 0;
const Equipment = require("../models/equipment");
const Maintenance = require("../models/maintenance");
// Create a location
const createMaintenanceServ = async (maint) => {
    try {
        const { activities, voltage_on_L1L2, voltage_on_L1L3, voltage_on_L2L3, suction_pressure, amp_engine_1, amp_engine_2, amp_engine_3, discharge_pressure, service_hour, service_date, photos, customer_sign, tech_sign, customerId, observations, equipmentId, techId, techName, techNumId, } = maint;
        const findEquipment = await Equipment.findOne({
            where: { id: maint.equipmentId },
        });
        if (!findEquipment.dataValues) {
            return {
                msg: "El Id del equipo no existe...",
                success: false,
            };
        }
        const findMaintenance = await Maintenance.findOne({
            where: { service_hour: maint.service_hour },
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
