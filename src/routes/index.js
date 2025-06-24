import express from 'express';
import contactRoutes from './contactRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/users', userRoutes);

export default router;
