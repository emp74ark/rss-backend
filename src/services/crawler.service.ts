import { loggerService } from './logger.service.js';
import { ArticleModel, SubscriptionModel } from '../db/dbModels.js';
import Parser from 'rss-parser';
import { RssItem, RssSource } from '../entities/rss/rss.types.js';
import { LogLevel } from '../entities/base/base.enums.js';
import { articleService } from './article.service.js';
import { ArticleDTO } from '../entities/article/article.types.js';
import { Subscription } from '../entities/subscription/subscription.types.js';

class CrawlerService {
  #rssParser = new Parser<RssSource, RssItem>({
    maxRedirects: 10,
  });

  updateSubscription = async (subscription: Subscription) => {
    try {
      loggerService.appLogger(`Run update subscription, ${subscription.title}`);
      const { items } = await this.#rssParser.parseURL(subscription.link);
      const existingArticleIds = subscription.articles;
      loggerService.appLogger(`EXISTING IDS, ${existingArticleIds.length}`, LogLevel.info);
      const existingArticles = await Promise.all(existingArticleIds.map((id) => ArticleModel.findById(id)));
      loggerService.appLogger(`EXISTING ARTICLES, ${existingArticles.length}`, LogLevel.info);
      const newArticles = items.filter((i) => !existingArticles.some((a) => a?.link === i.link));
      loggerService.appLogger(`NEW ARTICLES, ${newArticles.length}`, LogLevel.info);
      const newArticleFull = await articleService.addMany(newArticles as ArticleDTO[], {});
      const newArticleIds = newArticleFull?.map((a) => a._id);
      loggerService.appLogger(`NEW ARTICLE IDS, ${newArticleFull?.length}`, LogLevel.info);
      await SubscriptionModel.findByIdAndUpdate(subscription._id, { $push: { articles: newArticleIds } });
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  };

  async updateSubscriptions() {
    try {
      loggerService.appLogger(`Run update subscriptions, ${new Date().getTime()}`);
      const subscriptions = await SubscriptionModel.find();
      for (const sub of subscriptions) {
        await this.updateSubscription(sub);
      }
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }
}

const crawlerService = new CrawlerService();
export { crawlerService };
