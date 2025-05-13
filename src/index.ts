import express, { json } from 'express';
import cors from 'cors';
import session from 'express-session';
import { addRoutes } from './routes/routes.ts';
import { AUTH_SECRET, PORT } from './entities/base/base.constants.js';
import { loggerService } from './services/logger.service.ts';
import { LogLevel } from './entities/base/base.enums.ts';
import { dbConnection } from './db/dbConnection.js';
import { crawlerService } from './services/crawler.service.js';

const server = express();

server.use(loggerService.httpLogger);

server
  .listen(PORT, () => {
    loggerService.appLogger('Server is running', LogLevel.info);
  })
  .on('error', (err) => {
    loggerService.appLogger(err, LogLevel.error);
  });

server.use(
  session({
    secret: AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
    name: 'rss',
  }),
);

server.use(cors());

server.use(json());

addRoutes(server);

dbConnection().then(() => {
  crawlerService.updateSubscriptions().then(() => {
    loggerService.appLogger(`INITIAL DATA LOAD, ${new Date().getTime()}`, LogLevel.info);
  });
  setInterval(async () => {
    await crawlerService.updateSubscriptions();
  }, 3e5);
});
