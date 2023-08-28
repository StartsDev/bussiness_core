import { Request, Response } from "express";
import {
  allLocationsHeadServ,
  createLocationServ,
  getLocationsServ,
  getOneLocationServ,
  updateLocationServ,
  deleteLocationServ,
  getLocationServPag,
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
const getLocations = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter
    const locationName = (req.query.locationName as string) || undefined;
    const headName = (req.query.headName as string) || undefined;
    const businessName = (req.query.businessName as string) || undefined;
    
    if (!page && !pageSize) {
      const { linearData, totalCount } = await getLocationsServ(
        locationName,
        headName,
        businessName
      );
      res.status(200).json({
        locations: linearData,
        numItmes: totalCount,
      });
    } else {
      const { linearDatap, totalCountp } = await getLocationServPag(
        page,
        pageSize,
        locationName,
        headName,
        businessName
      );
      const totalPages = Math.ceil(totalCountp / (pageSize ?? totalCountp));
      res.status(200).json({
        locations: linearDatap,
        numItmes: totalCountp,
        currentPage: page,
        totalPages,
      });
    }
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
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { locations, totalCount } = await allLocationsHeadServ(
      req.params.headquarterId,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        locations,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        locations,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
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
  getLocations,
  getOneLocation,
  getLocationHead,
  editLocation,
  deleteLocation,
};
