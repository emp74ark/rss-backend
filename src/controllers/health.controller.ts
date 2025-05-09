import { exceptionController } from './exception.controller.ts';
import { Request, Response } from 'express';

class HealthController {
  healthStatus(req: Request, res: Response) {
    try {
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }
}

const healthController = new HealthController();
export { healthController };
