import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_JWT;

// estructura de los datos decodificados del token:
interface DecodedToken {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Extiende la interfaz de Request para incluir la propiedad 'decoded':
export interface CustomRequest extends Request {
  decoded?: DecodedToken;
  token?: any;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //Obtener token del encabezado de autorización
    const tokenArray = req.headers["x-token"] || req.headers.authorization;
    //Verificamos si el token es asignado
    if (!tokenArray) {
      return res.status(403).json({ message: "No token delivered" });
    }

    // Verificamos y decodificamos el token
    jwt.verify(tokenArray, secretKey, (err: any, decoded: DecodedToken) => {
      if (err) {
        return res.status(403).json({ mensaje: "Invalid Token" });
      }
      // Agregar los datos decodificados a la solicitud para que puedan ser utilizados en los controladores
      req.decoded = decoded;
      req.token = tokenArray;

      // Llama a la siguiente función del middleware
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
};

// Verificamos si el rol del usuario es Administrador
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  /* try {
    //Use axios petition
        const user = await User.findById(req.userId);
        if (user.role !== "admin") return res.status(401).json({ message: ROLE_ERROR });
        next();
    } catch (error) {
        return res.status(401).json({ error });
    } */
};
