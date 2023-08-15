"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Client = require("../models/client");
const Location = require("../models/location");
class Headquarter extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    headName;
    address;
    email;
    phone;
    isPrincipal;
    status;
    static associate(client, location) {
        // Client - Headquaters
        client.hasMany(Headquarter, {
            foreignKey: 'clientId',
            sourceKey: 'id',
            as: 'headquarters',
        });
        Headquarter.belongsTo(client, {
            foreignKey: 'clientId',
        });
        // Headquarters - Location
        Headquarter.hasMany(location, {
            foreignKey: 'headquarterId',
            as: 'locations',
        });
        location.belongsTo(Headquarter, {
            foreignKey: 'headquarterId',
        });
    }
}
Headquarter.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    headName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPrincipal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Headquarter",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
Headquarter.associate(Client, Location);
module.exports = Headquarter;
