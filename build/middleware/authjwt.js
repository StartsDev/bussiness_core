"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
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
// Verificamos si el rol del usuario es Administrador
const isAdmin = async (req, res, next) => {
    /* try {
      //Use axios petition
          const user = await User.findById(req.userId);
          if (user.role !== "admin") return res.status(401).json({ message: ROLE_ERROR });
          next();
      } catch (error) {
          return res.status(401).json({ error });
      } */
};
exports.isAdmin = isAdmin;
