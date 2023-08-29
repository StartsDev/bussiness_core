import { Request, Response } from "express";
import {
  createMaintenanceServ,
  getMaintenancesServ,
  getMaintByTechServ,
  getMaintByClientServ,
  getMainByEquipment,
  getMaintByIdServ,
  updateMaintenanceServ,
  deleteMaintenanceServ,
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
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { maintenances, totalCount } = await getMaintenancesServ(
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        maintenances,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        maintenances,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances by tech (home)
const getMaintenanceTech = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { maintenanceTech, totalCount } = await getMaintByTechServ(
      req.body,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        maintenanceTech,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        maintenanceTech,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all maintenances by client
const getMaintenanceClient = async (req: Request, res: Response) => {
  try {
    const maintenances = await getMaintByClientServ(req.params);
    res.status(200).json(maintenances);
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
    const id = parseInt(req.params.id);
    const maintenance = await updateMaintenanceServ(id, req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Delete maintenance
const deleteMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await deleteMaintenanceServ(req.params.id);
    res.status(200).json(maintenance);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export {
  createMaintenance,
  getMaintenances,
  getMaintenanceTech,
  getMaintenanceClient,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
};
