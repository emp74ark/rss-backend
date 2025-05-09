import { RssItem } from '../rss/rss.types.js';
import { MongoObjectType } from '../base/base.types.js';

export interface SubscriptionSettings {
  enable?: boolean;
  loadFullText?: boolean;
}

export interface SubscriptionItem extends RssItem {
  _id: MongoObjectType;
  tags: string[];
  read: boolean;
  fullText?: string;
}

export interface SubscriptionDTO {
  title: string;
  description?: string;
  link: string;
  settings: SubscriptionSettings;
  lastUpdate?: Date;
}

export interface Subscription extends SubscriptionDTO {
  _id: MongoObjectType;
  items: SubscriptionItem[];
  createdAt: Date;
  modifiedAt: Date;
}
