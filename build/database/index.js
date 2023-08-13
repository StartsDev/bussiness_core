"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DATABASE_URL } = process.env;
const { Sequelize, DataTypes, Op } = require("sequelize");
//para uso desplegado
const sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
sequelize
    .authenticate()
    .then(() => console.log("Postgres database connected"))
    .catch((error) => console.log("Something goes wrong " + error.message));
module.exports = { sequelize, DataTypes, Op };
