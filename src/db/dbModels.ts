import { model } from 'mongoose';
import { UserSchema } from './schemas/user.schemas.ts';
import { SubscriptionSchema } from './schemas/subscription.schemas.ts';

export const UserModel = model('user', UserSchema);
export const SubscriptionModel = model('subscription', SubscriptionSchema);
