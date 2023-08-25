"use strict";
import { Model } from "sequelize";
import { MaintenanceAttributes, StatusOption } from "../interfaces/maintenance.interface";
const { sequelize, DataTypes } = require("../database/index");

class Maintenance
  extends Model<MaintenanceAttributes>
  implements MaintenanceAttributes
{
  id!: number;
  activities!: string;
  voltage_on_L1L2!: number;
  voltage_on_L1L3!: number;
  voltage_on_L2L3!: number;
  voltage_control! : number;
  suction_pressure!: number;
  amp_engine_1!: number;
  amp_engine_2!: number;
  amp_engine_3!: number;
  amp_engine_4! : number;
  amp_engine_evap! : number;
  compressor_1_amp_L1!: number;
  compressor_1_amp_L2!: number;
  compressor_1_amp_L3!: number;
  compressor_2_amp_L1!: number;
  compressor_2_amp_L2!: number;
  compressor_2_amp_L3!: number;
  supply_temp!: number;
  return_temp! : number;
  water_in_temp! : number;
  water_out_temp! : number;
  sprinkler_state!: string;
  float_state!: string;
  discharge_pressure!: number;
  service_hour!: string;
  service_date!: string;
  customer_sign!: string;
  tech_sign!: string;
  photos!: string[];
  tech!: { techId: string; techName: string; techNumId: string };
  customerId!: string;
  observations!: string;
  additional_remarks!:string;
  status!: StatusOption;
  delete!: boolean;
  static associate(model: any) {}
}

Maintenance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    activities: {
      type: DataTypes.STRING(2000),
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
    voltage_control: {
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
    amp_engine_4: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    amp_engine_evap: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_1_amp_L1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_1_amp_L2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_1_amp_L3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_2_amp_L1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_2_amp_L2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    compressor_2_amp_L3: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    supply_temp: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    return_temp: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    water_in_temp: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    water_out_temp: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    sprinkler_state: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    float_state: {
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
    customer_sign: {          //Base64 - Text
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tech_sign: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    tech: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additional_remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
    type: DataTypes.ENUM(...Object.values(StatusOption)),
    allowNull: false,
    defaultValue: StatusOption.inProcess
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
