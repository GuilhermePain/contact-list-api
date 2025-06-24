import { Router } from 'express';
import userController from '../controllers/userController.js'

const router = Router();

router.get('/:id', userController.findUserById)
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deletedUser);

export default router;
