"use strict";
import { Model, UUIDV4 } from "sequelize";
import { MaintenanceAttributes } from "../interfaces/maintenance.interface";
const { sequelize, DataTypes } = require("../database/index");


class Maintenance
  extends Model<MaintenanceAttributes>
  implements MaintenanceAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!:number;
  activities!: string;
  voltage_on_L1L2!: number;
  voltage_on_L1L3!: number;
  voltage_on_L2L3!: number;
  suction_pressure!: number;
  amp_engine_1!: number;
  amp_engine_2!: number;
  amp_engine_3!: number;
  discharge_pressure!: number;
  service_hour!: string;
  service_date!: string;
  customer_sign!: string;
  tech_sign!: string;
  photos!: string[];
  techId!: string;
  customerId!: string;
  observations!: string;
  status!: string;
  delete!: boolean;
  static associate(model: any) {}
}

Maintenance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false,
    },
    activities: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voltage_on_L1L2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    voltage_on_L1L3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    voltage_on_L2L3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    suction_pressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    amp_engine_1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    amp_engine_2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    amp_engine_3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    discharge_pressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    service_hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    customer_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tech_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }, 
    techId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Maintenance",
    freezeTableName: true,
  }
);

module.exports = Maintenance;
