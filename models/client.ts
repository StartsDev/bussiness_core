"use strict";
import { Model, UUIDV4 } from "sequelize";
import { ClientAttributes } from "../interfaces/client.interface";
const { sequelize, DataTypes } = require("../database/index");
const Quotation = require("../models/quotation");


class Client extends Model<ClientAttributes> implements ClientAttributes {

  id!: string;
  businessName!: string;
  nit!: string;
  address!: string;
  email!: string;
  phone!: string;
  city!: string;
  contact!: string;
  status!: boolean;

  static associate(quotations: any) {

      // Client - Quotations
        Client.hasMany(quotations, {
          foreignKey: 'clientId',
          as: 'quotations',
        });
        
        quotations.belongsTo(Client, {
          foreignKey: 'clientId',
        });
  }
}
Client.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nit: {
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
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
    modelName: "Client",
    freezeTableName: true,
  }
);


// aqui estoy ejecutando las relaciones
Client.associate(Quotation);

module.exports = Client;
