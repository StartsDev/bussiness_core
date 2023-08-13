"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EquipmentAttributes } from "../interfaces/equipment.interface";
const { sequelize, DataTypes } = require("../database/index");
const Maintenance = require("../models/maintenance");

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
  name!: string;
  description!: string;
  serial!: string;
  image!: { public_id: string; secure_url: string };
  model!: string;
  brand!: string;
  status!: boolean;

  static associate(maintenance: any) {
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.JSON, 
      defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8TrrnMZ9mo9lDemTXDLXxAJsY6hiqCKJ6w&usqp=CAU"
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
Equipment.associate(Maintenance);

module.exports = Equipment;
