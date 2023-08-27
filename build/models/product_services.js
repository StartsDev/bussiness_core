"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Detailquot = require("../models/detailquot");
class ProductService extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    name;
    description;
    brand;
    model;
    unit_price;
    service_price;
    IVA;
    status;
    static associate(detailquot) {
        // Location - Location_Equipment
        ProductService.hasMany(detailquot, {
            foreignKey: "prod_servId",
            as: "detailquots",
        });
        detailquot.belongsTo(ProductService, {
            foreignKey: "prod_servId",
        });
    }
}
ProductService.init({
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
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    service_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    IVA: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "ProductService",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
ProductService.associate(Detailquot);
module.exports = ProductService;
