import express from "express"
import { addComment, deleteComment } from "../Controllers/commentController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const router = express.Router()

router.post("/:postId/comments", authMiddleware, addComment)
router.delete("/comments/:id", authMiddleware, deleteComment)

export default router