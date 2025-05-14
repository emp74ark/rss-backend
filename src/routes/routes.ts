import { Application } from 'express';
import healthRoutes from './health.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import articleRoutes from './article.routes.js';
import { authController } from '../controllers/auth.controller.js';

export const addRoutes = (app: Application) => {
  app.use('/health', healthRoutes);
  app.use('/auth', authRoutes);
  app.use('/user', authController.validate, userRoutes);
  app.use('/subscription', authController.validate, subscriptionRoutes);
  app.use('/article', authController.validate, articleRoutes);
};
