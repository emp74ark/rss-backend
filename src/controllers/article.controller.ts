import { RouteController } from '../entities/route-controller/route-controller.types.js';
import { Promise } from 'mongoose';
import { articleService } from '../services/article.service.js';
import { exceptionController } from './exception.controller.js';
import { Request, Response } from 'express';

class ArticleController implements RouteController {
  async addOne(req: Request, res: Response): Promise<void> {
    try {
      const article = req.body;
      const data = await articleService.addOne(article);
      res.status(201).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = await articleService.deleteOne({ id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tags = req.query.tags as string;
      const data = await articleService.getAll({ tags });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = await articleService.getOne({ id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const article = req.body;
      const data = await articleService.updateOne(article, { id });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  async updateMany(req: Request, res: Response): Promise<void> {
    try {
      const { ids, article } = req.body;
      const data = await articleService.updateMany({ ids, data: article });
      res.status(200).json(data);
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }
}

const articleController = new ArticleController();
export { articleController };
