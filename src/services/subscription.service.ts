import { DataService } from '../entities/data-service/data-service.types.js';
import { Subscription, SubscriptionDTO } from '../entities/subscription/subscription.types.js';
import { SubscriptionModel, UserModel } from '../db/dbModels.js';
import { loggerService } from './logger.service.js';
import { LogLevel } from '../entities/base/base.enums.js';
import { dtoCleanUp } from '../lib/dtoCleanUp.js';

class SubscriptionService implements DataService<Subscription, SubscriptionDTO> {
  async getAll({ userId }: { userId: string }): Promise<Subscription[] | undefined> {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return;
      }

      const ids = user['subscriptions'];

      const subscriptions = await Promise.all(
        ids.map((s) => {
          return SubscriptionModel.findById(s);
        }),
      );

      return subscriptions as unknown as Subscription[];
      // FIXME: check the type assertion
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async getOne({ id }: { id: string }): Promise<Subscription | null | undefined> {
    try {
      return SubscriptionModel.findById(id);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async addOne(data: SubscriptionDTO, { userId }: { userId: string }): Promise<Subscription | undefined> {
    try {
      dtoCleanUp(data);

      const sub = await new SubscriptionModel({
        ...data,
        createdAt: new Date(),
        modifiedAt: new Date(),
      }).save();

      if (!sub) {
        return;
      }

      await UserModel.findByIdAndUpdate(userId, {
        $push: { subscriptions: sub },
      });

      return sub as unknown as Subscription;
      // FIXME: check the type assertion
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async updateOne(data: Partial<SubscriptionDTO>, { id }: { id: string }): Promise<Subscription | null | undefined> {
    try {
      dtoCleanUp(data);

      return SubscriptionModel.findByIdAndUpdate(
        id,
        {
          ...data,
          modifiedAt: new Date(),
        },
        {
          new: true,
        },
      );
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async deleteOne({ id, userId }: { id: string; userId: string }): Promise<Subscription | null | undefined> {
    try {
      await SubscriptionModel.findByIdAndDelete(id);
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { subscriptions: id },
      });
      return null;
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }
}

const subscriptionService = new SubscriptionService();
export { subscriptionService };
