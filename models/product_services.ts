"use strict";
import { Model, UUIDV4 } from "sequelize";
import { ProductServAttributes } from "../interfaces/product_services.interface";
const { sequelize, DataTypes } = require("../database/index");
const Detailquot = require("../models/detailquot");

class ProductService
  extends Model<ProductServAttributes>
  implements ProductServAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  name!: string;
  description!: string;
  brand!: string;
  model!: string;
  unit_price!: number;
  service_price!: number;
  IVA!: number;
  status!: boolean;

  static associate(detailquot: any) {
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
ProductService.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
  },
  {
    sequelize,
    modelName: "ProductService",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
ProductService.associate(Detailquot);

module.exports = ProductService;
