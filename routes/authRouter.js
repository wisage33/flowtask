import { Router } from "express";
import { TelegramAuth } from "../middleware/tg.auth.js";

const router = Router()

router.post('/telegram', TelegramAuth)

export default router