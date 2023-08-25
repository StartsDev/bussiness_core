"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EquipmentAttributes } from "../interfaces/equipment.interface";
const { sequelize, DataTypes } = require("../database/index");
const Maintenance = require("../models/maintenance");
const Client = require("../models/client");

class Equipment
  extends Model<EquipmentAttributes>
  implements EquipmentAttributes
{ 
  id!: string;
  name!: string;
  description!: string;
  serial!: string;
  image!: string;
  model!: string;
  type!: string;     
  brand!: string;
  status!: boolean;

  static associate(maintenance: any, client: any) {
    // Equipment - Maintenance
    Equipment.hasMany(maintenance, {
      foreignKey: "equipmentId",
      as: "maintenances",
    });

    maintenance.belongsTo(Equipment, {
      foreignKey: "equipmentId",
    });
  }
}
Equipment.init(
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
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8TrrnMZ9mo9lDemTXDLXxAJsY6hiqCKJ6w&usqp=CAU",
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
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
    modelName: "Equipment",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
Equipment.associate(Maintenance, Client);

module.exports = Equipment;
