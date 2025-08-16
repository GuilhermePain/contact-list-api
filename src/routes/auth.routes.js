import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/signin', authController.login);
router.get('/profile', verifyAuth, authController.profile);

export default router;