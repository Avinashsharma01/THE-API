import express from "express"
const router = express.Router();
import { displayTODO, createTODO, updateTODO, deleteTODO } from "../Controlles/todo_controller.js"


// Get all todos
router.get('/display', displayTODO);

// Create a new todo
router.post('/create', createTODO);

// Update a todo
router.put('/update/:id', updateTODO);

// Delete a todo
router.delete('/delete/:id', deleteTODO);

export default router;
