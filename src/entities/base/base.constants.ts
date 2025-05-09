import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 3500;
export const DB_HOST = process.env.DB_HOST || 'mongodb://rss-db/rss';
export const AUTH_SECRET = process.env.AUTH_SECRET || 'secret';
