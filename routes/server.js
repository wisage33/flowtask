import { Router } from "express"
import taskController from "../controllers/tasksController.js"
import { getUsers } from "../controllers/usersController.js"
import { TelegramAuth } from "../middleware/telegramAuth.js"

const router = Router()

router.get('/api/tasks', TelegramAuth, taskController.getAll)
router.post('/api/tasks', taskController.create)
router.delete('/api/tasks/:id', taskController.delete)
router.get('/api/users', getUsers)

export default router