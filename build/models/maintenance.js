"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
class Maintenance extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    activities;
    voltage_on_L1L2;
    voltage_on_L1L3;
    voltage_on_L2L3;
    suction_pressure;
    amp_engine_1;
    amp_engine_2;
    amp_engine_3;
    discharge_pressure;
    service_hour;
    service_date;
    customer_sign;
    tech_sign;
    photos;
    techId;
    customerId;
    observations;
    status;
    delete;
    static associate(model) { }
}
Maintenance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    activities: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
    },
    tech_sign: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    techId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
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
