import { Schema } from 'mongoose';

const SubscriptionSettingsSchema = new Schema(
  {
    enabled: {
      type: Boolean,
      default: true,
    },
    loadFullText: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const SubscriptionItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: String,
  link: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentSnippet: String,
  guid: String,
  categories: [String],
  isoDate: {
    type: Date,
    required: true,
  },
  tags: [String],
  read: {
    type: Boolean,
    default: false,
  },
  fullText: {
    type: String,
  },
});

export const SubscriptionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  link: {
    type: String,
    required: true,
  },
  items: {
    type: [SubscriptionItemSchema],
    default: [],
  },
  lastUpdate: {
    type: Date,
  },
  settings: SubscriptionSettingsSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});
