"use strict";
import { Model, UUIDV4 } from "sequelize";
import { DetailQuotAttributes } from "../interfaces/detailquotation.interface";
const { sequelize, DataTypes } = require("../database/index");

class Detailquot extends Model<DetailQuotAttributes> implements DetailQuotAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
   id!: string;
   quantity!: number;
   subtotal! : number;

  static associate(model: any) {}
}
Detailquot.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
  },
  {
    sequelize,
    modelName: "Detailquot",
    freezeTableName: true,
  }
);

module.exports = Detailquot;
