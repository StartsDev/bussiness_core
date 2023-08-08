"use strict";
import { Model, UUIDV4 } from "sequelize";
import { QuotationAttributes } from "../interfaces/quotation.interface";
const { sequelize, DataTypes } = require("../database/index");
const Detailquot = require("../models/detailquot");

class Quotation
  extends Model<QuotationAttributes>
  implements QuotationAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  date!: Date;
  total!: number;

  static associate(detailquot: any) {
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
Quotation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
  },
  {
    sequelize,
    modelName: "Quotation",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
Quotation.associate(Detailquot);

module.exports = Quotation;
