import { pino } from 'pino';
import { pinoHttp } from 'pino-http';
import { LogLevel } from '../entities/base/base.enums.js';

class Logger {
  #defaultTransport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };

  #pinoLogger = pino({
    transport: this.#defaultTransport,
  });

  httpLogger = pinoHttp({
    transport: this.#defaultTransport,
    serializers: {
      req(req) {
        return `METHOD: ${req.method} URL: ${req.url}`;
      },
      res(res) {
        return `STATUS: ${res.statusCode}`;
      },
    },
  });

  appLogger = (data: unknown, level = LogLevel.info) => {
    switch (level) {
      case LogLevel.error:
        this.#pinoLogger.error(data);
        break;
      case LogLevel.warn:
        this.#pinoLogger.warn(data);
        break;
      default:
        this.#pinoLogger.info(data);
    }
  };
}

const loggerService = new Logger();
export { loggerService };
