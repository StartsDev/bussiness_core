"use strict";
import dotenv from "dotenv";
dotenv.config();
const { DATABASE_URL } = process.env;

const { Sequelize, DataTypes, Op } = require("sequelize");

//para uso desplegado
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 /*  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },  */ 
});

sequelize
  .authenticate()
  .then(() => console.log("Postgres database connected"))
  .catch((error: any) => console.log("Something goes wrong " + error.message));

module.exports = { sequelize, DataTypes, Op };
