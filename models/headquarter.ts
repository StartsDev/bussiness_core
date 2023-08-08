"use strict";
import { Model, UUIDV4 } from "sequelize";
import { HeadquarterAttributes } from "../interfaces/headquarter.interface";
const { sequelize, DataTypes } = require("../database/index");
const Client = require("../models/client");
const Location = require("../models/location");

class Headquarter extends Model<HeadquarterAttributes> implements HeadquarterAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
   id!: string
   headName!: string;
   address!: string;
   email!: string;
   phone!: string;
   isPrincipal!:boolean;
   status!: boolean;

  static associate(client: any, location: any) {

       // Client - Headquaters
       client.hasMany(Headquarter, {
        foreignKey: 'clientId',
        sourceKey: 'id',
        as: 'headquarters',
      });
      
      Headquarter.belongsTo(client, {
        foreignKey: 'clientId',
      });

  
      // Headquarters - Location
      Headquarter.hasMany(location, {
        foreignKey: 'headquarterId',
        as: 'locations',
      });
      
      location.belongsTo(Headquarter, {
        foreignKey: 'headquarterId',
      });
  }
}
Headquarter.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    headName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPrincipal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Headquarter",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
Headquarter.associate(Client, Location);


module.exports = Headquarter;
