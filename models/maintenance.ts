"use strict";
import { Model, UUIDV4 } from "sequelize";
import { MaintenanceAttributes } from "../interfaces/maintenance.interface";
const { sequelize, DataTypes } = require("../database/index");
//const Equipment = require("../models/equipment");

class Maintenance
  extends Model<MaintenanceAttributes>
  implements MaintenanceAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  serviceOrder!: string;
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
  serive_date!: Date;
  customer_sign!: string;
  tech_sign!: string;
  photos!: string[];
  techId!: string;
  observations!: string;
  status!: boolean;

  static associate(model:any) {} 
}

Maintenance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceOrder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voltage_on_L1L2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    voltage_on_L1L3: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    voltage_on_L2L3: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    suction_pressure: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    amp_engine_1: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    amp_engine_2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    amp_engine_3: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    discharge_pressure: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    service_hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serive_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customer_sign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tech_sign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    techId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
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

// aqui estoy ejecutando las relaciones
//Maintenance.associate(Equipment);

module.exports = Maintenance;
