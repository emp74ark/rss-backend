import { model } from 'mongoose';
import { UserSchema } from './schemas/user.schemas.js';
import { SubscriptionSchema } from './schemas/subscription.schemas.js';
import { ArticleSchema } from './schemas/article.schemas.js';

export const UserModel = model('user', UserSchema);
export const ArticleModel = model('article', ArticleSchema);
export const SubscriptionModel = model('subscription', SubscriptionSchema);
