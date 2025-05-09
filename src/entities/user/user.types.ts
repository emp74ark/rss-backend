import { MongoObjectType } from '../base/base.types.js';

export interface UserDTO {
  login: string;
  password: string;
  subscriptions: MongoObjectType[];
}

export interface User extends UserDTO {
  _id: MongoObjectType;
  createdAt: Date;
  modifiedAt: Date;
}
