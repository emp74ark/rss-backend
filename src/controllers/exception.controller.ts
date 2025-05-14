import { Response } from 'express';
import { loggerService } from '../services/logger.service.js';
import { LogLevel } from '../entities/base/base.enums.js';

export class ExceptionController {
  httpException = (res: Response, e: unknown) => {
    if (typeof e === 'object' && e !== null && 'code' in e && 'message' in e) {
      if (e.code === 11000) {
        res.status(409).json({ message: 'Conflict' });
        loggerService.appLogger(e.message, LogLevel.warn);
        return;
      }
    }
    loggerService.appLogger(e, LogLevel.error);
    res.status(500).json({ message: 'Internal server error' });
  };
}

const exceptionController = new ExceptionController();
export { exceptionController };
