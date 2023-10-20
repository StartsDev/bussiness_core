import { Request, Response } from "express";
import {
  createHeadServ,
  getHeadServ,
  getOneHeadServ,
  allHeadClientServ,
  updateHeadServ,
  deleteHeadServ,
} from "../services/headq.services";

//Register new headquarter
const createHeadqaurter = async (req: Request, res: Response) => {
  try {
    const headquarter = await createHeadServ(req.body);
    res.status(200).json(headquarter);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get all headquarters
const getHeadquarters = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { headquarters, totalCount, totalPages } = await getHeadServ(page, pageSize);
    if (!page && !pageSize) {
      res.status(200).json({
        headquarters,
        numItmes: totalCount,
      });
    } 
    if(page && pageSize){
      res.status(200).json({
        headquarters,
        numItmes: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get one headquarters
const getOneHeadquarter = async (req: Request, res: Response) => {
  try {
    const headquarter = await getOneHeadServ(req.params.id);
    res.status(200).json(headquarter);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Get headquarters by client
const getHeadqClient = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || undefined; // Get the requested page from query parameter
    const pageSize = parseInt(req.query.pageSize as string) || undefined; // Get the requested page size from query parameter

    const { hedClient, totalCount } = await allHeadClientServ(
      req.params.clientId,
      page,
      pageSize
    );
    if (!page && !pageSize) {
      res.status(200).json({
        hedClient,
        numItmes: totalCount,
      });
    } else {
      const totalPages = Math.ceil(totalCount / (pageSize ?? totalCount));
      res.status(200).json({
        hedClient,
        totalItems: totalCount,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

// Update headquarter
const editHeadquarter = async (req: Request, res: Response) => {
  try {
    const headquarter = await updateHeadServ(req.params.id, req.body);
    res.status(200).json(headquarter);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Delete headquarter
const deleteHeadquarter = async (req: Request, res: Response) => {
  try {
    const head = await deleteHeadServ(req.params.id);
    res.status(200).json(head);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export {
  createHeadqaurter,
  getHeadquarters,
  getOneHeadquarter,
  getHeadqClient,
  editHeadquarter,
  deleteHeadquarter,
};
