import { Application } from 'express';
import healthRoutes from './health.routes.ts';
import userRoutes from './user.routes.ts';
import authRoutes from './auth.routes.ts';
import subscriptionRoutes from './subscription.routes.ts';
import articleRoutes from './article.routes.js';
import { authController } from '../controllers/auth.controller.js';

export const addRoutes = (app: Application) => {
  app.use('/health', healthRoutes);
  app.use('/auth', authRoutes);
  app.use('/user', authController.validate, userRoutes);
  app.use('/subscription', authController.validate, subscriptionRoutes);
  app.use('/article', authController.validate, articleRoutes);
};
