import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller.js';

const router = Router();

router.get('/', subscriptionController.getAll);

router.get('/:id', subscriptionController.getOne);

router.post('/', subscriptionController.addOne);

router.delete('/:id', subscriptionController.deleteOne);

router.patch('/:id', subscriptionController.updateOne);

export default router;
