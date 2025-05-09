import { Router } from 'express';
import { rssController } from '../controllers/rss.controller.ts';

const router = Router();

router.get('/', rssController.getRss);

export default router;
