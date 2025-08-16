import { Router } from 'express';
import userController from '../controllers/user.controller.js'
import { verifyAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user/index.js';

const router = Router();

router.get('/', verifyAuth, userController.findUserById)
router.post('/', validate(createUserSchema), userController.createUser);
router.patch('/', verifyAuth, validate(updateUserSchema), userController.updateUser);
router.delete('/', verifyAuth, userController.deletedUser);

export default router;
