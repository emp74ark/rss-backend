import { DataService } from '../entities/data-service/data-service.types.js';
import { Article, ArticleDTO } from '../entities/article/article.types.js';
import { loggerService } from './logger.service.js';
import { LogLevel } from '../entities/base/base.enums.js';
import { ArticleModel } from '../db/dbModels.js';
import { dtoCleanUp } from '../lib/dtoCleanUp.js';

class ArticleService implements DataService<Article, ArticleDTO> {
  async addOne(data: ArticleDTO, args?: Record<string, unknown>): Promise<Article | undefined> {
    try {
      dtoCleanUp(data);
      return new ArticleModel(data).save();
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async addMany(data: ArticleDTO[], args?: Record<string, unknown>): Promise<Article[] | undefined> {
    try {
      loggerService.appLogger(`SERVICE DATA${data}`, LogLevel.info);
      return ArticleModel.insertMany(data);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async deleteOne({ id }: { id: string }): Promise<Article | undefined | null> {
    try {
      return ArticleModel.findByIdAndDelete(id);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async getAll(args?: Record<string, unknown>): Promise<Article[] | undefined> {
    try {
      return ArticleModel.find();
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async getOne({ id }: { id: string }): Promise<Article | undefined | null> {
    try {
      return ArticleModel.findById(id);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async updateOne(data: Partial<ArticleDTO>, { id }: { id: string }): Promise<Article | undefined | null> {
    try {
      dtoCleanUp(data);
      return ArticleModel.findByIdAndUpdate(id, data);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }
}

const articleService = new ArticleService();
export { articleService };
