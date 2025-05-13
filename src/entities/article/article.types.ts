import { RssItem } from '../rss/rss.types.js';
import { MongoObjectType, MongoOptionalType } from '../base/base.types.js';

export interface ArticleDTO extends RssItem {
  tags: string[];
  read: boolean;
}

export interface Article extends RssItem {
  _id: MongoObjectType;
  tags: string[];
  read: boolean;
  readonly fullText?: MongoOptionalType<string>;
}
