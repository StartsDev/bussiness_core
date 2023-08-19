import { Request, Response } from "express";
import {
  newEquipmentServ,
  getEquipmentServ,
  getOneEquipmentServ,
  allEquipmentsLocationServ,
  updateEquipmentServ,
  deleteEquipmentServ,
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
  const { page, pageSize }:any = req.query;
  try {
    // const page = parseInt(req.query.page as string) || 1; // Get the requested page from query parameter
    // const pageSize = parseInt(req.query.pageSize as string) || 10; // Get the requested page size from query parameter

    const { equipments, totalCount } = await getEquipmentServ(page, pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      equipments,
      numItmes: totalCount,
      currentPage: parseInt(page),
      totalPages,
    });
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
    const equipmentsLoc = await allEquipmentsLocationServ(
      req.params.locationId
    );
    res.status(200).json(equipmentsLoc);
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

export {
  createEquipment,
  getAllEquipments,
  getOneEquipment,
  getEquipmentsLocation,
  editEquipment,
  deleteEquipment,
};
