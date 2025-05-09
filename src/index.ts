import express, { json } from 'express';
import cors from 'cors';
import { addRoutes } from './routes/routes.ts';
import { PORT } from './entities/base/base.constants.js';
import { loggerService } from './services/logger.service.ts';
import { LogLevel } from './entities/base/base.enums.ts';
import { dbConnection } from './db/dbConnection.js';

const server = express();

server.use(loggerService.httpLogger);

server
  .listen(PORT, () => {
    loggerService.appLogger('Server is running', LogLevel.info);
  })
  .on('error', (err) => {
    loggerService.appLogger(err, LogLevel.error);
  });

server.use(cors());

server.use(json());

addRoutes(server);

dbConnection();
