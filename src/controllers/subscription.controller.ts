import { RouteController } from '../entities/route-controller/route-controller.types.js';
import { exceptionController } from './exception.controller.js';
import { Request, Response } from 'express';
import { subscriptionService } from '../services/subscription.service.js';

class SubscriptionController implements RouteController {
  async addOne(req: Request, res: Response): Promise<void> {
    try {
      const user = req.session.user;

      if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const subscription = req.body;

      const data = await subscriptionService.addOne(subscription, { userId: user.id });

      res.status(201).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const user = req.session.user;
      if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const id = req.params.id;
      await subscriptionService.deleteOne({ id, userId: user.id });
      res.status(200).json({ message: 'Subscription deleted' });
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const user = req.session.user;

      if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const subscriptions = await subscriptionService.getAll({ userId: user.id });
      res.status(200).json({ subscriptions });
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const filter = req.query as Record<string, string>;
      const data = await subscriptionService.getOne({ id, filter });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const subscription = req.body;
      const data = await subscriptionService.updateOne(subscription, { id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }
}

const subscriptionController = new SubscriptionController();
export { subscriptionController };
