"use strict";
import { Model, UUIDV4 } from "sequelize";
import { LoctionAttributes } from "../interfaces/location.interface";
const { sequelize, DataTypes } = require("../database/index");
const LocationEquip = require("../models/locationEquip");

class Location extends Model<LoctionAttributes> implements LoctionAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  locationName!: string;

  static associate(locationequip: any) {
     // Location - Location_Equipment
     Location.hasMany(locationequip, {
      foreignKey: 'locationId',
      as: 'locationequips',
    });
    
    locationequip.belongsTo(Location, {
      foreignKey: 'locationId',
    });
  }
}
Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Location",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
Location.associate(LocationEquip);


module.exports = Location;
