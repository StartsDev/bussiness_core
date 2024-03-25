import { Request, Response } from "express";
import {
  allLocationsHeadServ,
  createLocationServ,
  getLocationsServ,
  getOneLocationServ,
  updateLocationServ,
  deleteLocationServ,
  getLocationServPag,
  bulkCreateLocations,
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
    const addressh = req.query.addressh as string || undefined;
    const emailh = req.query.emailh as string || undefined;
    const phoneh = req.query.phoneh as string || undefined;
    const businessName = (req.query.businessName as string) || undefined;
    const nit = (req.query.nit as string) || undefined;
    const city = (req.query.city as string) || undefined;
    const contact = (req.query.contact as string) || undefined;
    const addressc = req.query.addressc as string || undefined;
    const emailc = req.query.emailc as string || undefined;
    const phonec = req.query.phonec as string || undefined;
    
    if (!page && !pageSize) {
      const { linearData, totalCount } = await getLocationsServ(
        locationName,
        headName,
        addressh,
        emailh,
        phoneh,
        businessName,
        nit,
        city,
        contact,
        addressc,
        emailc,
        phonec
      );
      res.status(200).json({
        locations: linearData,
        numItmes: totalCount,
      });
    }  
    if (page && pageSize) {
      const { linearDatap, totalCountp, totalPages } = await getLocationServPag(
        page,
        pageSize,
        locationName,
        headName,
        addressh,
        emailh,
        phoneh,
        businessName,
        nit,
        city,
        contact,
        addressc,
        emailc,
        phonec
      );
      res.status(200).json({
        locations: linearDatap,
        numItmes: totalCountp,
        currentPage: page,
        totalPages,
      });
    }
    // if (pageSize) {
    //   res.status(400).json({
    //     msg: "Tiene que haber un número de página...",
    //   });
    // }
    // if (page) {
    //   res.status(400).json({
    //     msg: "Debe indicar el número de items por página...",
    //   });
    // }
  } catch (error) {
    console.log('error', error)
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
    const locationName = (req.query.locationName as string) || undefined;

    const { locations, totalCount, totalPages } = await allLocationsHeadServ(
      req.params.headquarterId,
      page,
      pageSize,
      locationName
    );
    if (!page && !pageSize) {
      res.status(200).json({
        locations,
        numItmes: totalCount,
      });
    } else {
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

//bulkcreate Location

const bulkCreate = async (req: Request, res: Response) => {
  try {
    const location = await bulkCreateLocations(req.body);
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
  bulkCreate
};
