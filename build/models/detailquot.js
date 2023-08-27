"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
class Detailquot extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    quantity;
    subtotal;
    static associate(model) { }
}
Detailquot.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    }
}, {
    sequelize,
    modelName: "Detailquot",
    freezeTableName: true,
});
module.exports = Detailquot;
