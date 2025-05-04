import { Router } from "express"
import { createTask, getTasks } from "../controllers/tasksController.js"
import { getUsers } from "../controllers/usersController.js"

const router = Router()

router.get('/api/tasks', getTasks)
router.post('/api/tasks', createTask)
router.get('/api/users', getUsers)

export default router