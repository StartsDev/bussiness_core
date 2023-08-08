"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EquipmentAttributes } from "../interfaces/equipment.interface";
const { sequelize, DataTypes } = require("../database/index");
const Maintenance = require("../models/maintenance");
const LocationEquip = require("../models/locationEquip");

class Equipment
  extends Model<EquipmentAttributes>
  implements EquipmentAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  description!: string;
  reference!: string;
  model!: string;
  brand!: string;
  status!: boolean;

  static associate(locationequip: any, maintenance: any) {

    // Equipment - Location_Equipment
    Equipment.hasMany(locationequip, {
      foreignKey: "equipmentId",
      as: "locationequips",
    });

    locationequip.belongsTo(Equipment, {
      foreignKey: "equipmentId",
    });

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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
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
Equipment.associate(LocationEquip, Maintenance);

module.exports = Equipment;
