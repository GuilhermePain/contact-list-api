import express from 'express';
import contactRoutes from './contactRoutes.js';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
