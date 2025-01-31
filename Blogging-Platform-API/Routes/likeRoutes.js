import express from "express"
import { likePost } from "../Controllers/likeController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const router = express.Router();

router.post("/:postId/like", authMiddleware, likePost)

export default router