import { Router } from "express"
import { getAll } from "../controllers/tasksController.js"

const router = Router()

router.get('/api/json', getAll)

export default router