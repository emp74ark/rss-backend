import { Request, Response } from 'express';

export interface RouteController {
  getAll(req: Request, res: Response): Promise<void>;

  getOne(req: Request, res: Response): Promise<void>;

  addOne(req: Request, res: Response): Promise<void>;

  updateOne(req: Request, res: Response): Promise<void>;

  deleteOne(req: Request, res: Response): Promise<void>;
}
