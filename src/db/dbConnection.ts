import mongoose from 'mongoose';
import { DB_HOST } from '../entities/base/base.constants.js';
import { loggerService } from '../services/logger.service.js';
import { LogLevel } from '../entities/base/base.enums.js';

export const dbConnection = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      retryWrites: true,
    });
    loggerService.appLogger('Successfully connected to MongoDB');
  } catch (err) {
    loggerService.appLogger(err, LogLevel.error);
  }
};
