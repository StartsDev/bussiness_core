import express from "express";
import dotenv from "dotenv";
const { sequelize } = require("./database/index");
const cors = require("cors");
const morgan = require("morgan");
import headquartersRoute from "./routes/headquartersRoute";
import clientRoute from "./routes/clientRoute";

// Models
require("./models/client");
require("./models/headquarter");
require("./models/equipment");
require("./models/locationEquip");
require("./models/location");
require("./models/maintenance");
require("./models/detailquot");
require("./models/quotation");
require("./models/product_services");

dotenv.config();
const app = express();

const port = process.env.PORT || 7000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//Routes
app.use("/api/v1/headquarter", headquartersRoute);
app.use("/api/v1/client", clientRoute);


// Sync db function
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Sincronización de la base de datos exitosa.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
}

app.listen(port, () => {
  console.log("Server run on Port =>  " + port);
  syncDatabase();
});
