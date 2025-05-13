import { MongoObjectType, MongoOptionalType } from '../base/base.types.js';

export interface SubscriptionSettings {
  enable?: MongoOptionalType<boolean>;
  loadFullText?: MongoOptionalType<boolean>;
}

export interface SubscriptionDTO {
  title: string;
  description?: MongoOptionalType<string>;
  link: string;
  settings: SubscriptionSettings;
  lastUpdate?: MongoOptionalType<Date>;
}

export interface Subscription extends SubscriptionDTO {
  _id: MongoObjectType;
  articles: MongoObjectType[];
  createdAt: Date;
  modifiedAt: Date;
}
