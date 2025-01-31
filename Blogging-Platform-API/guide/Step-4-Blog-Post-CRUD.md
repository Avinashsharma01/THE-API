Great! Now, let's implement **CRUD operations for blog posts**. 🚀

---

# **Step 4: Blog Post CRUD**

### **Features:**

✅ **Create** a blog post  
✅ **Read** (Get All & Single Post)  
✅ **Update** a post (Only Author/Admin)  
✅ **Delete** a post (Only Author/Admin)  
✅ **Secure routes using JWT authentication**

---

## **1️⃣ Create the Blog Post Model**

Create:  
📂 `src/models/Post.js`

```javascript
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: { type: String, required: true },
        tags: [{ type: String }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
```

---

## **2️⃣ Create Post Controller**

Create:  
📂 `src/controllers/postController.js`

```javascript
const Post = require("../models/Post");

// @route   POST /api/posts
// @desc    Create a new blog post
exports.createPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const newPost = new Post({
            title,
            content,
            category,
            tags,
            author: req.user.id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   GET /api/posts
// @desc    Get all blog posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   GET /api/posts/:id
// @desc    Get a single blog post
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "username email"
        );
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   PUT /api/posts/:id
// @desc    Update a blog post (Only Author/Admin)
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.tags = req.body.tags || post.tags;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   DELETE /api/posts/:id
// @desc    Delete a blog post (Only Author/Admin)
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **3️⃣ Create Post Routes**

Create:  
📂 `src/routes/postRoutes.js`

```javascript
const express = require("express");
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/postController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
```

---

## **4️⃣ Integrate Routes in Server**

Modify:  
📂 `src/index.js`

```javascript
const postRoutes = require("./routes/postRoutes");

app.use("/api/posts", postRoutes);
```

---

## **5️⃣ Test API using Postman**

### **Create a Blog Post**

**POST** `http://localhost:5000/api/posts`  
**Headers:**  
`Authorization: Bearer <your_token>`  
**Body (JSON):**

```json
{
    "title": "My First Blog",
    "content": "This is my first blog post!",
    "category": "Technology",
    "tags": ["Node.js", "MongoDB", "Express"]
}
```

### **Get All Blog Posts**

**GET** `http://localhost:5000/api/posts`

### **Get a Single Post**

**GET** `http://localhost:5000/api/posts/:id`

### **Update a Post**

**PUT** `http://localhost:5000/api/posts/:id`  
(Only **Author/Admin** can update)

### **Delete a Post**

**DELETE** `http://localhost:5000/api/posts/:id`  
(Only **Author/Admin** can delete)

---

## **Next Step: Comments & Likes**

Shall we continue with **comments & likes** system? 🚀
