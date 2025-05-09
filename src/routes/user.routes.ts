import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.post('/', userController.addOne);

router.patch('/:id', userController.updateOne);

router.delete('/:id', userController.deleteOne);

export default router;
