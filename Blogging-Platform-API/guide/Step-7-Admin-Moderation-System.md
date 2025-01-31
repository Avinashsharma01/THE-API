Awesome! Let’s implement the **admin moderation** system. 🛠️

---

# **Step 7: Admin Moderation System**

### **Features:**

✅ **Admin Functionality**:

-   Admins can approve, reject, or flag posts.
-   Admins can delete inappropriate comments.  
    ✅ **Post Status**: Implement status-based filtering (e.g., **approved**, **pending**, **rejected**).

---

## **1️⃣ Add Post Status Field**

We'll add a `status` field to the **Post** model to track whether a post is approved, pending, or rejected by an admin.

Modify:  
📂 `src/models/Post.js`

```javascript
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
        tags: { type: [String], required: true },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "approved", "rejected"],
        }, // New field for status
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
```

---

## **2️⃣ Update Post Controller for Admin Actions**

We'll create functions for admins to **approve**, **reject**, or **flag** posts, as well as **delete inappropriate comments**.

Modify:  
📂 `src/controllers/postController.js`

```javascript
// @route   PUT /api/posts/:id/approve
// @desc    Approve a post (Admin only)
exports.approvePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!req.user.isAdmin)
            return res.status(403).json({ message: "Admin access required" });

        post.status = "approved";
        await post.save();

        res.json({ message: "Post approved", post });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   PUT /api/posts/:id/reject
// @desc    Reject a post (Admin only)
exports.rejectPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!req.user.isAdmin)
            return res.status(403).json({ message: "Admin access required" });

        post.status = "rejected";
        await post.save();

        res.json({ message: "Post rejected", post });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **3️⃣ Admin Delete Comment**

Add the **delete comment** function for the admin to remove any inappropriate comments.

Modify:  
📂 `src/controllers/commentController.js`

```javascript
// @route   DELETE /api/comments/:id (Admin only)
// @desc    Delete a comment (Admin)
exports.deleteCommentByAdmin = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment)
            return res.status(404).json({ message: "Comment not found" });

        if (!req.user.isAdmin)
            return res.status(403).json({ message: "Admin access required" });

        await comment.deleteOne();
        res.json({ message: "Comment deleted by admin" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **4️⃣ Create Admin Routes**

Create routes for **approving** and **rejecting** posts.

Create:  
📂 `src/routes/adminRoutes.js`

```javascript
const express = require("express");
const { approvePost, rejectPost } = require("../controllers/postController");
const { deleteCommentByAdmin } = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin-only routes
router.put("/posts/:id/approve", authMiddleware, approvePost);
router.put("/posts/:id/reject", authMiddleware, rejectPost);
router.delete("/comments/:id", authMiddleware, deleteCommentByAdmin);

module.exports = router;
```

---

## **5️⃣ Integrate Admin Routes in Server**

Modify the main server to include the **admin routes**.

Modify:  
📂 `src/index.js`

```javascript
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes); // Admin routes prefixed with /api/admin
```

---

## **6️⃣ Update User Model to Track Admin Role**

Ensure that users have the `isAdmin` property set. This allows us to check if a user is an admin when performing admin actions.

Modify:  
📂 `src/models/User.js`

```javascript
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false }, // New field to track admin role
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
```

---

## **7️⃣ Test Admin Functionality**

### **Approve a Post (Admin only)**

**PUT** `http://localhost:5000/api/admin/posts/:postId/approve`  
(Only Admin can approve)

### **Reject a Post (Admin only)**

**PUT** `http://localhost:5000/api/admin/posts/:postId/reject`  
(Only Admin can reject)

### **Delete a Comment (Admin only)**

**DELETE** `http://localhost:5000/api/admin/comments/:commentId`  
(Only Admin can delete inappropriate comments)

---

## **Next Step: Finalizing & Testing**

Now that we have **admin moderation** in place, it's a good idea to test the complete workflow:

1. **Test User Registration and Login**
2. **Test Admin Functions**
3. **Test Comments and Likes**
4. **Test Pagination and Filtering**

Shall we go ahead and wrap it up with testing and final adjustments?
