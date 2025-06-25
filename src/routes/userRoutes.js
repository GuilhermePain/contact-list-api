import { Router } from 'express';
import userController from '../controllers/userController.js'
import { verifyAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:id', verifyAuth, userController.findUserById)
router.post('/', userController.createUser);
router.patch('/:id', verifyAuth, userController.updateUser);
router.delete('/:id', verifyAuth, userController.deletedUser);

export default router;
