import { Request, Response } from "express";
import {
    createMaintenanceServ,
    getMaintenancesServ,
} from "../services/maintenance.services";


//Register new maintenance
const createMaintenance = async (req: Request, res: Response) => {
    try {
      const maintenance = await createMaintenanceServ(req.body);
      res.status(200).json(maintenance);
    } catch (error) {
        console.log(error)
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

  export {
    createMaintenance,
    getMaintenances,
  };
