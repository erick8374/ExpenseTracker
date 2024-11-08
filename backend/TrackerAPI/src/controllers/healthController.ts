import { Request, Response } from "express";
export class HealthController {
  get = async (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Sucesso',
            });
        };
  };