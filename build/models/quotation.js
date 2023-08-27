"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
const Detailquot = require("../models/detailquot");
class Quotation extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    date;
    total;
    static associate(detailquot) {
        // Location - Location_Equipment
        Quotation.hasMany(detailquot, {
            foreignKey: "quotationId",
            as: "detailquots",
        });
        detailquot.belongsTo(Quotation, {
            foreignKey: "quotationId",
        });
    }
}
Quotation.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: "Quotation",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
Quotation.associate(Detailquot);
module.exports = Quotation;
