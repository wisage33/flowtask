import { Router } from "express"
import taskController from "../controllers/tasks.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/isAdmin.middleware.js"

const router = Router()

router.get('/api/tasks', authenticate, taskController.getAll)
router.post('/api/tasks', authenticate, isAdmin, taskController.create)
router.delete('/api/tasks/:id', authenticate, isAdmin, taskController.delete)
router.post('/api/tasks/:id/assign', authenticate, taskController.assignTaskToUser)
router.post('/api/tasks/:id/complete', authenticate, taskController.completeTask)

export default router