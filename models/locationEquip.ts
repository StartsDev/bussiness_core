"use strict";
import { Model, UUIDV4 } from "sequelize";
import { LocationEquipmentAttributes } from "../interfaces/locat_equip.interface";
const { sequelize, DataTypes } = require("../database/index");


class LocationEquip
  extends Model<LocationEquipmentAttributes>
  implements LocationEquipmentAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  cantidad!: number;
  status!: boolean;

  static associate(equipment: any) {}
}
LocationEquip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "LocationEquip",
    freezeTableName: true,
  }
);

module.exports = LocationEquip;
