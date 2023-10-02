"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Equipment = require("../models/equipment");
class Location extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    locationName;
    description;
    status;
    static associate(equipment) {
        Location.hasMany(equipment, {
            foreignKey: 'locationId',
            as: 'equipments',
        });
        equipment.belongsTo(Location, {
            foreignKey: 'locationId',
        });
    }
}
Location.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    locationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: "Location",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
Location.associate(Equipment);
module.exports = Location;
