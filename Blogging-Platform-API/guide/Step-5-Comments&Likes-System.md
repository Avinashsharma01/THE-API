Awesome! Now, let's implement **comments and likes** on blog posts. 🚀

---

# **Step 5: Comments & Likes System**

### **Features:**

✅ **Add comments on posts**  
✅ **Delete comments (Only Comment Author/Admin)**  
✅ **Like/unlike posts**

---

## **1️⃣ Create the Comment Model**

Create:  
📂 `src/models/Comment.js`

```javascript
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
```

---

## **2️⃣ Create Comment Controller**

Create:  
📂 `src/controllers/commentController.js`

```javascript
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// @route   POST /api/posts/:postId/comments
// @desc    Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;

        const comment = new Comment({
            content,
            author: req.user.id,
            post: postId,
        });
        await comment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id },
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   DELETE /api/comments/:id
// @desc    Delete a comment (Only Author/Admin)
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment)
            return res.status(404).json({ message: "Comment not found" });

        if (comment.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await comment.deleteOne();
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **3️⃣ Create Like Controller**

Create:  
📂 `src/controllers/likeController.js`

```javascript
const Post = require("../models/Post");

// @route   POST /api/posts/:postId/like
// @desc    Like/Unlike a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const userId = req.user.id;
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            res.json({ message: "Post unliked" });
        } else {
            post.likes.push(userId);
            res.json({ message: "Post liked" });
        }

        await post.save();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **4️⃣ Create Comment & Like Routes**

Create:  
📂 `src/routes/commentRoutes.js`

```javascript
const express = require("express");
const {
    addComment,
    deleteComment,
} = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId/comments", authMiddleware, addComment);
router.delete("/comments/:id", authMiddleware, deleteComment);

module.exports = router;
```

Create:  
📂 `src/routes/likeRoutes.js`

```javascript
const express = require("express");
const { likePost } = require("../controllers/likeController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId/like", authMiddleware, likePost);

module.exports = router;
```

---

## **5️⃣ Integrate Routes in Server**

Modify:  
📂 `src/index.js`

```javascript
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/api/posts", commentRoutes);
app.use("/api/posts", likeRoutes);
```

---

## **6️⃣ Test API using Postman**

### **Add a Comment**

**POST** `http://localhost:5000/api/posts/:postId/comments`  
**Headers:**  
`Authorization: Bearer <your_token>`  
**Body (JSON):**

```json
{
    "content": "This is a great blog post!"
}
```

### **Delete a Comment**

**DELETE** `http://localhost:5000/api/comments/:commentId`  
(Only **Author/Admin** can delete)

### **Like/Unlike a Post**

**POST** `http://localhost:5000/api/posts/:postId/like`  
(Toggles like/unlike)

---

## **Next Step: Pagination & Filtering**

Shall we continue with **pagination and filtering for browsing posts?** 🚀
