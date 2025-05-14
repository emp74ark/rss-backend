import { Router } from 'express';
import { articleController } from '../controllers/article.controller.js';

const router = Router();

router.get('/', articleController.getAll);

router.get('/:id', articleController.getOne);

router.post('/', articleController.addOne);

router.patch('/', articleController.updateMany);

router.patch('/:id', articleController.updateOne);

router.delete('/:id', articleController.deleteOne);

export default router;
