import { Request, Response } from "express";
import { createHeadServ, getHeadServ } from "../services/headq.services";

//Register new headquarter
const createHeadqaurter= async (req: Request, res: Response) => {
    try {
       const headquarter = await createHeadServ(req.body);
       res.status(200).json(headquarter);
    } catch (error) {
      if (error instanceof Error) res.status(400).json({ error: error.message })
    }
  };
  
  // Get all headquarters
  const getHeadquarters = async (req: Request, res: Response) => {
    try{
      const headquarters = await getHeadServ();
      res.status(200).json(headquarters);
    }catch(error){
      if (error instanceof Error) res.status(400).json({ error: error.message })
    }
  }
  
  export { createHeadqaurter, getHeadquarters };