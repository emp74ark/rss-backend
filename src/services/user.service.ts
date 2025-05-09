import { User, UserDTO } from '../entities/user/user.types.js';
import { UserModel } from '../db/dbModels.js';
import { loggerService } from './logger.service.js';
import { LogLevel } from '../entities/base/base.enums.js';
import { dtoCleanUp } from '../lib/dtoCleanUp.js';
import { DataService } from '../entities/data-service/data-service.types.js';

class UserService implements DataService<User, UserDTO> {
  async addOne(data: UserDTO): Promise<User | undefined> {
    try {
      dtoCleanUp(data);

      return new UserModel({
        ...data,
        createdAt: new Date(),
        modifiedAt: new Date(),
      }).save();
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async deleteOne(id: string): Promise<User | undefined | null> {
    try {
      return UserModel.findByIdAndDelete(id);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async getAll(args?: Record<string, unknown>): Promise<User[] | undefined> {
    try {
      return UserModel.find({}, { login: 1 });
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async getOne({ id }: { id: string }): Promise<User | undefined | null> {
    try {
      return UserModel.findById(id);
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }

  async updateOne(id: string, data: Partial<UserDTO>): Promise<User | undefined | null> {
    try {
      dtoCleanUp(data);
      return UserModel.findByIdAndUpdate(
        id,
        {
          ...data,
          modifiedAt: new Date(),
        },
        { new: true },
      );
    } catch (error) {
      loggerService.appLogger(error, LogLevel.error);
    }
  }
}

const userService = new UserService();
export { userService };
