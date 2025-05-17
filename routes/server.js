import { Router } from "express"
import taskController from "../controllers/tasksController.js"
import { getUsers } from "../controllers/usersController.js"
import { TelegramAuth } from "../middleware/telegramAuth.js"

const router = Router()
// router.use(TelegramAuth)

router.get('/api/tasks', taskController.getAll, (req, res) => {
    console.log(req.body)
})
router.post('/api/tasks', taskController.create)
router.delete('/api/tasks/:id', taskController.delete)
router.get('/api/users', getUsers)

export default router