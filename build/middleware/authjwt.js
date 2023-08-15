"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTech = exports.verifyToken = void 0;
const axios_1 = __importDefault(require("axios"));
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_JWT;
const verifyToken = async (req, res, next) => {
    try {
        //Obtener token del encabezado de autorización
        const tokenArray = req.headers["x-token"] || req.headers.authorization;
        //Verificamos si el token es asignado
        if (!tokenArray) {
            return res.status(403).json({ message: "No token delivered" });
        }
        // Verificamos y decodificamos el token
        jwt.verify(tokenArray, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ mensaje: "Invalid Token" });
            }
            // Agregar los datos decodificados a la solicitud para que puedan ser utilizados en los controladores
            req.decoded = decoded;
            req.token = tokenArray;
            // Llama a la siguiente función del middleware
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
};
exports.verifyToken = verifyToken;
// Verificamos si el rol del usuario es Tecnico
const isTech = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const response = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = response.data;
        if (!userData.user) {
            return res.status(401).json({ message: "Usuario no válido" });
        }
        if (userData.user.Role.role !== "Tecnico")
            return res
                .status(401)
                .json({ message: "El rol de usuario no es técnico" });
        req.body.techId = userData.user.id;
        req.body.techName = `${userData.user.firstName} ${userData.user.lastName}`;
        req.body.techNumId = userData.user.numIdent;
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isTech = isTech;
