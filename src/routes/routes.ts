import { Application } from 'express';
import healthRoutes from './health.routes.ts';
import rssRoutes from './rss.routes.ts';
import userRoutes from './user.routes.ts';

export const addRoutes = (app: Application) => {
  app.use('/health', healthRoutes);
  app.use('/user', userRoutes);
  app.use('/rss', rssRoutes);
};
