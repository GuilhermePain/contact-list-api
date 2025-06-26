import express from 'express';
import contactRoutes from './contact.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
