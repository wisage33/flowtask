import { Router } from "express"
import { createTask, getTasks } from "../controllers/tasksController.js"

const router = Router()

router.get('/api/tasks', getTasks)
router.post('/api/tasks', createTask)

export default router