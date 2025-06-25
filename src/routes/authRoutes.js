import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post('/signin', authController.login);

export default router;