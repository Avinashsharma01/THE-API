Great! Let's implement **pagination and filtering** for browsing blog posts. 🚀

---

# **Step 6: Pagination and Filtering**

### **Features:**

✅ **Pagination**: Limit the number of posts returned at once and provide a way to navigate through multiple pages of posts.  
✅ **Filtering**: Filter posts based on **categories** and **tags**.

---

## **1️⃣ Update Post Controller for Pagination & Filtering**

In the `getPosts` route, we'll add functionality for **pagination** (e.g., `page` and `limit` parameters) and **filters** (e.g., `category` and `tags`).

Modify:  
📂 `src/controllers/postController.js`

```javascript
// @route   GET /api/posts
// @desc    Get all blog posts with pagination and filtering
exports.getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, tags } = req.query;
        const query = {};

        if (category) query.category = category;
        if (tags) query.tags = { $in: tags.split(",") };

        const posts = await Post.find(query)
            .populate("author", "username email")
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); // Sort posts by creation date (newest first)

        const totalPosts = await Post.countDocuments(query);

        res.json({
            posts,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page),
            postsPerPage: parseInt(limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **2️⃣ Update Post Routes**

We'll make sure the routes handle query parameters for pagination and filtering.

Modify:  
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
router.get("/", getPosts); // Pagination and filtering handled by query params
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
```

---

## **3️⃣ Test Pagination and Filtering in Postman**

Now, you can test pagination and filtering in your API using **query parameters**.

### **Get All Posts with Pagination**

**GET** `http://localhost:5000/api/posts?page=1&limit=5`  
(You can modify `page` and `limit` to get different pages and number of posts per page)

### **Get All Posts with Filtering by Category**

**GET** `http://localhost:5000/api/posts?category=Technology&page=1&limit=5`

### **Get Posts with Multiple Tags**

**GET** `http://localhost:5000/api/posts?tags=node,express&page=1&limit=5`

---

## **4️⃣ Test Edge Cases**

Test the following edge cases in your API:

-   **Pagination with invalid page number**: For example, `page=0`, `limit=10`
-   **Filtering with no posts matching**: Test filters like `category=NonExistentCategory`.
-   **Empty result when no filters are provided**: Test pagination and filtering without parameters.

---

## **Next Step: Admin Moderation**

Would you like to add an **admin moderation** system to manage posts and comments? You could create endpoints to approve, reject, or report posts.
