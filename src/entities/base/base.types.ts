import mongoose from 'mongoose';

export type MongoObjectType = mongoose.Types.ObjectId;

export type MongoOptionalType<T> = T | null;
