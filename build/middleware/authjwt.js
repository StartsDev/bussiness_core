"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin_isTech_isSuperU = exports.isSuperUser_isAdmin = exports.isSuperUser = exports.isAdmin = exports.isTech = exports.verifyToken = void 0;
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
//ROLES DE USUARIO
// Verificamos si el rol del usuario es Tecnico
const isTech = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const response = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = response.data;
        if (!userData.findUser) {
            return res.status(401).json({ message: "Usuario no válido" });
        }
        if (userData.findUser.Role.role !== "Tecnico")
            return res
                .status(401)
                .json({ message: "El rol de usuario no es técnico" });
        req.body.techId = userData.findUser.id;
        req.body.techName = `${userData.findUser.firstName} ${userData.findUser.lastName}`;
        req.body.techNumId = userData.findUser.numIdent;
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isTech = isTech;
//Verificamos si el rol del usuario es administrador
const isAdmin = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const response = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = response.data;
        if (!userData.findUser) {
            return res.status(401).json({ message: "Usuario no válido" });
        }
        if (userData.findUser.Role.role !== "Administrador")
            return res
                .status(401)
                .json({ message: "El rol de usuario no es administrador" });
        req.body.userId = userData.findUseruser.id;
        req.body.userName = `${userData.findUseruser.firstName} ${userData.findUseruser.lastName}`;
        req.body.numIdent = userData.findUseruser.numIdent;
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isAdmin = isAdmin;
//Verificamos si el rol del usuario es super usuario
const isSuperUser = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const response = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = response.data;
        if (!userData.findUser) {
            return res.status(401).json({ message: "Usuario no válido" });
        }
        if (userData.findUser.Role.role !== "Super_Usuario")
            return res
                .status(401)
                .json({ message: "El rol de usuario no es super usuario" });
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isSuperUser = isSuperUser;
const isSuperUser_isAdmin = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const { data } = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = data;
        //  console.log(response)
        // console.log('RESPONDE:', response);
        console.log('DATA:', data);
        console.log('DATA1:', data.findUser);
        console.log('DATA2:', data.findUser.Role);
        console.log('DATA3:', data.findUser.Role.role);
        if (!userData?.findUser) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        if (userData?.findUser?.Role?.role !== "Super_Usuario" || userData?.findUser?.Role?.role !== "Administrador") {
            return res.status(401).json({
                message: "El rol de usuario no es super usuario o administrador",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isSuperUser_isAdmin = isSuperUser_isAdmin;
const isAdmin_isTech_isSuperU = async (req, res, next) => {
    try {
        const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
        const baseUrl = `${URL}/user/get-user`;
        const id = req.decoded?.userId;
        const response = await axios_1.default.get(`${baseUrl}/${id}`);
        const userData = response.data;
        if (!userData.findUser) {
            return res.status(401).json({ message: "Usuario no válido" });
        }
        if (userData.findUser.Role.role !== "Super_Usuario" &&
            userData.findUser.Role.role !== "Administrador" &&
            userData.findUser.Role.role !== "Tecnico")
            return res.status(401).json({ message: "Este rol no es permitido" });
        req.body.rolName = userData.user.Role.role;
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
};
exports.isAdmin_isTech_isSuperU = isAdmin_isTech_isSuperU;
