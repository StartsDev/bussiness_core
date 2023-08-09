"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Maintenance = require("../models/maintenance");
class Equipment extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    name;
    description;
    serial;
    image;
    model;
    brand;
    status;
    static associate(maintenance) {
        // Equipment - Maintenance
        Equipment.hasMany(maintenance, {
            foreignKey: "equipmentId",
            as: "maintenances",
        });
        maintenance.belongsTo(Equipment, {
            foreignKey: "equipmentId",
        });
    }
}
Equipment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    serial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Equipment",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
Equipment.associate(Maintenance);
module.exports = Equipment;
