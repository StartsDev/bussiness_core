"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { sequelize } = require("./database/index");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const headquartersRoute_1 = __importDefault(require("./routes/headquartersRoute"));
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
const locationRoute_1 = __importDefault(require("./routes/locationRoute"));
const equipmentRoute_1 = __importDefault(require("./routes/equipmentRoute"));
const maintenanceRoute_1 = __importDefault(require("./routes/maintenanceRoute"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
// Models
require("./models/client");
require("./models/headquarter");
require("./models/equipment");
require("./models/location");
require("./models/maintenance");
require("./models/detailquot");
require("./models/quotation");
require("./models/product_services");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 7000;
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));
app.use(morgan("tiny"));
//Routes
app.use("/api/v1/headquarter", headquartersRoute_1.default);
app.use("/api/v1/client", clientRoute_1.default);
app.use("/api/v1/location", locationRoute_1.default);
app.use("/api/v1/equipment", equipmentRoute_1.default);
app.use("/api/v1/maintenance", maintenanceRoute_1.default);
app.use("/api/v1/image", imageRoutes_1.default);
// Sync db function
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log("Sincronización de la base de datos exitosa.");
    }
    catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
    }
}
app.listen(port, () => {
    console.log("Server run on Port =>  " + port);
    syncDatabase();
});
