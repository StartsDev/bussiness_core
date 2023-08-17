import { Request, Response } from "express";
import {
  createMaintenanceServ,
  getMaintenancesServ,
  getMaintByTechServ,
  getMaintByClientServ,
  getMainByEquipment,
  getMaintByIdServ,
  updateMaintenanceServ,
} from "../services/maintenance.services";

//Register new maintenance
const createMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await createMaintenanceServ(req.body);
    res.status(200).json(maintenance);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances
const getMaintenances = async (req: Request, res: Response) => {
  try {
    const maintenances = await getMaintenancesServ();
    res.status(200).json(maintenances);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances by tech
const getMaintenanceTech = async (req: Request, res: Response) => {
  try {
    const maintech = await getMaintByTechServ(req.body);
    res.status(200).json(maintech);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances by client
const getMaintenanceClient = async (req: Request, res: Response) => {
  try {
    const maintclient = await getMaintByClientServ(req.params);
    res.status(200).json(maintclient);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances by equipment
const getMaintenanceEquipment = async (req: Request, res: Response) => {
  try {
    const maintequip = await getMainByEquipment(req.params);
    res.status(200).json(maintequip);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get one maintenance by Id
const getMaintenanceById = async (req: Request, res: Response) => {
  try {
    const maintenance = await getMaintByIdServ(req.params);
    res.status(200).json(maintenance);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Update maintenance
const updateMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await updateMaintenanceServ(req.params.id, req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
}
// Delete maintenance

export {
  createMaintenance,
  getMaintenances,
  getMaintenanceTech,
  getMaintenanceClient,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
};
