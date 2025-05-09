import { Request, Response } from 'express';
import { exceptionController } from './exception.controller.ts';
import Parser from 'rss-parser';
import { RssItem, RssSource } from '../entities/rss/rss.types.ts';


class RssController {
  getRss = async (req: Request, res: Response) => {
    try {
      const parser = new Parser<RssSource, RssItem>();
      const rssUrl = 'http://habrahabr.ru/rss/blogs/javascript/';
      const feed = await parser.parseURL(rssUrl);
      res.status(200).json({ title: feed.title, items: feed.items });
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  };
}

const rssController = new RssController();
export { rssController };
