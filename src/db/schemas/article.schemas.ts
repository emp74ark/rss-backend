import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
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
  contentSnippet: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    required: true,
  },
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
