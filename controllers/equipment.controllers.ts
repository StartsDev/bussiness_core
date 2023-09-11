import { Request, Response } from "express";
import {
  newEquipmentServ,
  getEquipmentServ,
  getEquipmentServPag,
  getOneEquipmentServ,
  allEquipmentsLocationServ,
  updateEquipmentServ,
  deleteEquipmentServ,
  bulkCreateEquipments,
} from "../services/equipment.services";

//Register new equipment
const createEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await newEquipmentServ(req.body);
    res.status(200).json(equipment);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Get All Equipments
const getAllEquipments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter
    const name = (req.query.name as string) || undefined;
    const serial = (req.query.serial as string) || undefined;
    const model = (req.query.model as string) || undefined;
    const type = (req.query.type as string) || undefined;
    const brand = (req.query.brand as string) || undefined;
    const locationName = (req.query.locationName as string) || undefined;
    const headName = (req.query.headName as string) || undefined;
    const businessName = (req.query.businessName as string) || undefined;

    if (page && pageSize) {
      const { equipments, totalCount, totalPages } = await getEquipmentServPag(
        name,
        serial,
        model,
        type,
        brand,
        page,
        pageSize,
        locationName,
        headName,
        businessName
      );
      res.status(200).json({
        equipments,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }

    if (pageSize) {
      res.status(400).json({
        msg: "Tiene que haber un número de página...",
      });
    }

    if (page) {
      res.status(400).json({
        msg: "Debe indicar el número de items por página...",
      });
    }

    if (!page && !pageSize) {
      const { equipments, totalCount } = await getEquipmentServ(
        name,
        serial,
        model,
        type,
        brand,
        locationName,
        headName,
        businessName
      );
      res.status(200).json({
        equipments,
        numItmes: totalCount,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Get One Equipment
const getOneEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await getOneEquipmentServ(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Get equipments by location
const getEquipmentsLocation = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { equipLocation, totalCount, totalPages } = await allEquipmentsLocationServ(
      req.params.locationId,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        equipLocation,
        numItmes: totalCount,
      });
    } 
    if (page && pageSize) {
        res.status(200).json({
          equipLocation,
          numItmes: totalCount,
          currentPage: page,
          totalPages,
        });
    }
    if (pageSize) {
      res.status(400).json({
        msg: "Tiene que haber un número de página...",
      });
    }
    if (page) {
      res.status(400).json({
        msg: "Debe indicar el número de items por página...",
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Update equipment
const editEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await updateEquipmentServ(req.params.id, req.body);
    res.status(200).json(equipment);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Delete equipment
const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await deleteEquipmentServ(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

const bulkCreate = async (req: Request, res: Response) => {
  try {
    const equipments = await bulkCreateEquipments(req.body);
    res.status(200).json(equipments);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export {
  createEquipment,
  getAllEquipments,
  getOneEquipment,
  getEquipmentsLocation,
  editEquipment,
  deleteEquipment,
  bulkCreate,
};
