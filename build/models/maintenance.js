"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
//const Equipment = require("../models/equipment");
class Maintenance extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    serviceOrder;
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
    serive_date;
    customer_sign;
    tech_sign;
    photos;
    techId;
    observations;
    status;
    static associate(model) { }
}
Maintenance.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    serviceOrder: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activities: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    voltage_on_L1L2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    voltage_on_L1L3: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    voltage_on_L2L3: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    suction_pressure: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    amp_engine_1: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    amp_engine_2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    amp_engine_3: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    discharge_pressure: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    service_hour: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serive_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    customer_sign: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tech_sign: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    techId: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Maintenance",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
//Maintenance.associate(Equipment);
module.exports = Maintenance;
