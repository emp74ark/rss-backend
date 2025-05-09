import { RouteController } from '../entities/route-controller/route-controller.types.js';
import { Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import { exceptionController } from './exception.controller.js';

class UserController implements RouteController {
  async addOne(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      // TODO: hash password
      const data = await userService.addOne(user);
      res.status(201).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = await userService.deleteOne({ id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await userService.getAll();
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = await userService.getOne({ id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = req.body;
      const data = await userService.updateOne(user, { id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }
}

const userController = new UserController();
export { userController };
