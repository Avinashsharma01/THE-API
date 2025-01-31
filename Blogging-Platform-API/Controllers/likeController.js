


import Post from "../Models/models.Post.js";

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.id;
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            await post.save();
            res.json({ message: 'Post unliked' });
        } else {
            post.likes.push(userId);
            await post.save();
            res.json({ message: "Post liked" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export {
    likePost
}


// import Post from "../Models/models.Post.js"

// const likePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId)
//         if (!post) {
//             return res.status(404).json({ message: "post not found" })
//         }
//         const userId = req.user.postId
//         const hasliked = post.likes.includes(userId)

//         if (hasliked) {
//             post.likes = post.likes.filter((id) => id.toString() !== userId)
//             res.json({ message: 'post unliked' })
//         } else {
//             post.likes.push(userId)
//             res.json({ message: "post liked" })
//         }
//         await post.save()
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// }

// export {
//     likePost
// }