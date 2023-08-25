"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Quotation = require("../models/quotation");
class Client extends sequelize_1.Model {
    id;
    businessName;
    nit;
    address;
    email;
    phone;
    city;
    contact;
    status;
    static associate(quotations) {
        // Client - Quotations
        Client.hasMany(quotations, {
            foreignKey: 'clientId',
            as: 'quotations',
        });
        quotations.belongsTo(Client, {
            foreignKey: 'clientId',
        });
    }
}
Client.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit: {
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
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Client",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
Client.associate(Quotation);
module.exports = Client;
