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
      return next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
};
//ROLES DE USUARIO
// Verificamos si el rol del usuario es Tecnico o Cliente
export const validateRolUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    
    //Obtener token x-apikey del encabezado de autorización
    
    const apiToken = req.headers["x-apikey"] || req.headers.authorization;

    if (!apiToken) {
      return res.status(403).json({ message: "No API token entregado [x-apikey]..." });
    }

    if(apiToken !== process.env.API_KEY){
      return{
        msg:"API key no válido...",
        success: false
      }
    }

    const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;

    const baseUrl = `${URL}/user/get-user`;

    const id = req.decoded?.userId;
    
    const response: AxiosResponse<any> = await axios.get(`${baseUrl}/${id}`);
    const userData: any = response.data;

    if (!userData.findUser) {
      return res.status(401).json({ message: "Usuario no válido" });
    }
    if (userData.findUser.Role.role === "Tecnico") {
      req.body.techId = userData.findUser.id;
      req.body.techName = `${userData.findUser.firstName} ${userData.findUser.lastName}`;
      req.body.techNumId = userData.findUser.numIdent;
      req.body.role = userData.findUser.Role.role;
      return next();
    }
    if (userData.findUser.Role.role === "Cliente"){
      return res.status(403).json({ mensaje: "Como cliente no puede registrar mantenimientos..." });
    }
    if (userData.findUser.Role.role === "Administrador"){
      return next();
    }
    if (userData.findUser.Role.role === "Super_Usuario"){
      return next();
    }
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

    if (!userData.findUser) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    if (userData.findUser.Role.role !== "Administrador") {
      return res
        .status(401)
        .json({ message: "El rol de usuario no es administrador" });
    }
    req.body.userId = userData.findUseruser.id;
    req.body.userName = `${userData.findUseruser.firstName} ${userData.findUseruser.lastName}`;
    req.body.numIdent = userData.findUseruser.numIdent;
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

    if (!userData.findUser) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    if (userData.findUser.Role.role !== "Super_Usuario") {
      return res
        .status(401)
        .json({ message: "El rol de usuario no es super usuario" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const isSuperUser_isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;

    const baseUrl = `${URL}/user/get-user`;

    const id = req.decoded?.userId;

    const { data }: AxiosResponse<any> = await axios.get(`${baseUrl}/${id}`);
    const userData: any = data;
  
    if (!userData?.findUser) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (userData?.findUser?.Role?.role === "Tecnico") {
      return res.status(401).json({
        message: "El rol de usuario no es super usuario, administrador o cliente...",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const isAdmin_isTech_isSuperU = async (
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
    if (!userData?.findUser) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    if (
      userData?.findUser?.Role?.role !== "Super_Usuario" &&
      userData?.findUser?.Role?.role !== "Administrador" &&
      userData?.findUser?.Role?.role !== "Tecnico" &&
      userData?.findUser?.Role?.role !== "Cliente"
    ) {
      return res.status(401).json({ message: "Este rol no es permitido" });
    }
    req.body.rolName = userData.findUser.Role.role;
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
