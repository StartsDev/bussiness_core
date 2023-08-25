"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const maintenance_interface_1 = require("../interfaces/maintenance.interface");
const { sequelize, DataTypes } = require("../database/index");
class Maintenance extends sequelize_1.Model {
    id;
    activities;
    voltage_on_L1L2;
    voltage_on_L1L3;
    voltage_on_L2L3;
    voltage_control;
    suction_pressure;
    amp_engine_1;
    amp_engine_2;
    amp_engine_3;
    amp_engine_4;
    amp_engine_evap;
    compressor_1_amp_L1;
    compressor_1_amp_L2;
    compressor_1_amp_L3;
    compressor_2_amp_L1;
    compressor_2_amp_L2;
    compressor_2_amp_L3;
    supply_temp;
    return_temp;
    water_in_temp;
    water_out_temp;
    sprinkler_state;
    float_state;
    discharge_pressure;
    service_hour;
    service_date;
    customer_sign;
    tech_sign;
    photos;
    tech;
    customerId;
    observations;
    additional_remarks;
    status;
    delete;
    static associate(model) { }
}
Maintenance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    activities: {
        type: DataTypes.STRING(2000),
        allowNull: true,
    },
    voltage_on_L1L2: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    voltage_on_L1L3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    voltage_on_L2L3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    voltage_control: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    suction_pressure: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    amp_engine_1: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    amp_engine_2: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    amp_engine_3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    amp_engine_4: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    amp_engine_evap: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_1_amp_L1: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_1_amp_L2: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_1_amp_L3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_2_amp_L1: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_2_amp_L2: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    compressor_2_amp_L3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    supply_temp: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    return_temp: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    water_in_temp: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    water_out_temp: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    sprinkler_state: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    float_state: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    discharge_pressure: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    },
    service_hour: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    service_date: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    customer_sign: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tech_sign: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    tech: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    additional_remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(maintenance_interface_1.StatusOption)),
        allowNull: false,
        defaultValue: maintenance_interface_1.StatusOption.inProcess
    },
    delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Maintenance",
    freezeTableName: true,
});
module.exports = Maintenance;
