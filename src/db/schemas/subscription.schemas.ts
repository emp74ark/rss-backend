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
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'articles',
    },
  ],
  lastUpdate: {
    type: Date,
  },
  settings: {
    type: SubscriptionSettingsSchema,
    default: {
      enabled: true,
      loadFullText: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});
