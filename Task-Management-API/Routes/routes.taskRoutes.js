import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../Controllers/controllers.taskController.js';
import authMiddleware from '../Middleware/middleware.auth.js';

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
