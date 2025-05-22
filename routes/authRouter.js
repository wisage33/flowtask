import { Router } from "express";
import { TelegramAuth } from "../controllers/auth.controller.js";

const router = Router()

router.post('/login', TelegramAuth)

export default router