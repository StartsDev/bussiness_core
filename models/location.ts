"use strict";
import { Model, UUIDV4 } from "sequelize";
import { LoctionAttributes } from "../interfaces/location.interface";
const { sequelize, DataTypes } = require("../database/index");
const Equipment = require("../models/equipment");

class Location extends Model<LoctionAttributes> implements LoctionAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  locationName!: string;
  description!: string;
  status!:boolean;

  static associate(equipment: any) {

    
    Location.hasMany(equipment,{
      foreignKey: 'locationId',
      as: 'equipments',
    });
    equipment.belongsTo(Location, {
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
  },
  {
    sequelize,
    modelName: "Location",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
Location.associate(Equipment);


module.exports = Location;
