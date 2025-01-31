import Comment from "../Models/models.Comment.js"
import Post from "../Models/models.Post.js"

const addComment = async (req, res) => {
    try {
        const { content } = req.body
        const postId = req.params.postId

        const comment = new Comment({
            content,
            author: req.user.id,
            post: postId
        })
        await comment.save()

        await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: comment._id
            }
        })
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" })
        }

        if (comment.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await comment.deleteOne();
        res.json({ message: "Comment Deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export {
    addComment,
    deleteComment
}