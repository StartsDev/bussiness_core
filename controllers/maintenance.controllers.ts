import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authjwt";
import {
  createMaintenanceServ,
  getMaintenancesServ,
  getMaintByUserServ,
  getMainByEquipment,
  getMaintByIdServ,
  updateMaintenanceServ,
  deleteMaintenanceServ,
} from "../services/maintenance.services";

//Register new maintenance
const createMaintenance = async (req: CustomRequest, res: Response) => {
  try {
    const maintenance = await createMaintenanceServ(req.body)
    return res.status(200).json(maintenance);
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
  }
};

// Get all maintenances
const getMaintenances = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { maintenances, totalCount, totalPages } = await getMaintenancesServ(
      page,
      pageSize
    );

    if (!page && !pageSize) {
      res.status(200).json({
        maintenances,
        numItmes: totalCount,
      });
    }     
    if(page && pageSize) {
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


// Get all maintenances by user (tech-clients) (home)
const getMaintenanceUser = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { maintenanceUser, totalCount } = await getMaintByUserServ(
      req.body,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        maintenanceUser,
        numItmes: totalCount,
      });
    } else {
      if (totalCount) {
        const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
        res.status(200).json({
          maintenanceUser,
          numItmes: totalCount,
          currentPage: page,
          totalPages,
        });
      }
    }
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
  getMaintenanceUser,
  getMaintenanceEquipment,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
};
