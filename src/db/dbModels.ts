import { model } from 'mongoose';
import { UserSchema } from './schemas/user.schemas.ts';
import { SubscriptionSchema } from './schemas/subscription.schemas.ts';
import { ArticleSchema } from './schemas/article.schemas.js';

export const UserModel = model('user', UserSchema);
export const ArticleModel = model('article', ArticleSchema);
export const SubscriptionModel = model('subscription', SubscriptionSchema);
