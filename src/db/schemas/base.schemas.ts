import { Schema } from 'mongoose';

export const DocumentDateSchema = new Schema(
  {
    type: Date,
    default: Date.now,
  },
  {
    _id: false,
  },
);
