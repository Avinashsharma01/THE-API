import express from "express"
import {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost
} from "../Controllers/postController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const router = express.Router()

router.post("/createpost", authMiddleware, createPost)
router.get("/getpost", getPost)
router.get("/getpostbyid/:id", getPostById)
router.put("/updatepost/:id", authMiddleware, updatePost)
router.delete("/deletepost/:id", authMiddleware, deletePost)


export default router
