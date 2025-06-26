import { Router } from 'express';
import userController from '../controllers/user.controller.js'
import { verifyAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyAuth, userController.findUserById)
router.post('/', userController.createUser);
router.patch('/', verifyAuth, userController.updateUser);
router.delete('/', verifyAuth, userController.deletedUser);

export default router;
