import { Request, Response } from "express";
import {
  newEquipmentServ,
  getEquipmentServ,
  getOneEquipmentServ,
  allEquipmentsLocationServ,
  updateEquipmentServ,
  deleteEquipmentServ
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
    const equipments = await getEquipmentServ();
    res.status(200).json(equipments);
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
    if (error instanceof Error) res.status(400).json({ error: error.message })
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
