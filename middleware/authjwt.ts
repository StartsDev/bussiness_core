import { Request, Response, NextFunction } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
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

//ROLES DE USUARIO
// Verificamos si el rol del usuario es Tecnico
export const isTech = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;

    const baseUrl = `${URL}/user/get-user`;

    const id = req.decoded?.userId;

    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/${id}`);
    const userData: any = response.data;

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
  } catch (error) {
    return res.status(401).json({ error });
  }
};

//Verificamos si el rol del usuario es administrador
export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;

    const baseUrl = `${URL}/user/get-user`;

    const id = req.decoded?.userId;

    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/${id}`);
    const userData: any = response.data;

    if (!userData.user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }
    if (userData.user.Role.role !== "Administrador")
      return res
        .status(401)
        .json({ message: "El rol de usuario no es administrador" });
    req.body.userId = userData.user.id;
    req.body.userName = `${userData.user.firstName} ${userData.user.lastName}`;
    req.body.numIdent = userData.user.numIdent;
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

//Verificamos si el rol del usuario es super usuario
export const isSuperUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;

    const baseUrl = `${URL}/user/get-user`;

    const id = req.decoded?.userId;

    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/${id}`);
    const userData: any = response.data;

    if (!userData.user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }
    if (userData.user.Role.role !== "Super_Usuario")
      return res
        .status(401)
        .json({ message: "El rol de usuario no es super usuario" });
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};