import { Request, Response } from "express";
import {
  allLocationsHeadServ,
  createLocationServ,
  getLocationsServ,
  getOneLocationServ,
  updateLocationServ,
  deleteLocationServ,
} from "../services/location.services";

// Create new Location
const createLocation = async (req: Request, res: Response) => {
  try {
    const headquarter = await createLocationServ(req.body);
    res.status(200).json(headquarter);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all locations
const getLotaions = async (req: Request, res: Response) => {
  try {
    const locations = await getLocationsServ();
    res.status(200).json(locations);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get one location
const getOneLocation = async (req: Request, res: Response) => {
  try {
    const location = await getOneLocationServ(req.params.id);
    res.status(200).json(location);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get locations by headquarters
const getLocationHead = async (req: Request, res: Response) => {
  try {
    const locationshead = await allLocationsHeadServ(req.params.headquarterId);
    res.status(200).json(locationshead);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Update location

const editLocation = async (req: Request, res: Response) => {
  try {
    const location = await updateLocationServ(req.params.id, req.body);
    res.status(200).json(location);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Delete location

const deleteLocation = async (req: Request, res: Response) => {
  try {
    const location = await deleteLocationServ(req.params.id);
    res.status(200).json(location);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export {
  createLocation,
  getLotaions,
  getOneLocation,
  getLocationHead,
  editLocation,
  deleteLocation,
};
