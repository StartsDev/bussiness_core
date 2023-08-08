import { Request, Response } from "express";
import {
  createHeadServ,
  getHeadServ,
  getOneHeadServ,
  allHeadClientServ,
  updateHeadServ,
  deleteHeadServ
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
    const headquarters = await getHeadServ();
    res.status(200).json(headquarters);
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
const getHeadqClient = async(req: Request, res: Response)=>{
  try {
    const headersq = await allHeadClientServ(req.params.clientId);
    res.status(200).json(headersq);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
}

// Update headquarter
const editHeadquarter = async (req: Request, res: Response) => {
  try {
    const headquarter = await updateHeadServ(req.params.id, req.body);
    res.status(200).json(headquarter);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

//Delete a client
const deleteHeadquarter = async (req: Request, res: Response) => {
  try {
    const head = await deleteHeadServ(req.params.id);
    res.status(200).json(head);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message })
  }
};

export {
  createHeadqaurter,
  getHeadquarters,
  getOneHeadquarter,
  getHeadqClient,
  editHeadquarter,
  deleteHeadquarter
};
