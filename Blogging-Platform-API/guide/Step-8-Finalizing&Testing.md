Great! Let's finalize and test everything to ensure that the **Blogging Platform API** is working smoothly. 🎯

---

# **Step 8: Finalizing & Testing**

### **1️⃣ Test User Registration and Login**

Before testing the admin features, make sure **user registration** and **login** are working properly.

1. **Sign Up (POST)**  
   **POST** `http://localhost:5000/api/auth/signup`  
   Request body:

    ```json
    {
        "username": "user1",
        "email": "user1@example.com",
        "password": "password123"
    }
    ```

2. **Login (POST)**  
   **POST** `http://localhost:5000/api/auth/login`  
   Request body:
    ```json
    {
        "email": "user1@example.com",
        "password": "password123"
    }
    ```
    **Response**: You'll receive a JWT token which you will use to authenticate other API calls.

### **2️⃣ Test Admin Functions**

#### **Approve a Post (Admin)**

1. **Sign in as Admin**
   First, sign up a user with `isAdmin` set to `true` in the database (this can be done manually in MongoDB for testing purposes).
2. **Approve Post (PUT)**  
   **PUT** `http://localhost:5000/api/admin/posts/:postId/approve`  
   Make sure to **use the admin JWT token** in the authorization header:
    ```json
    Authorization: Bearer <admin_jwt_token>
    ```

#### **Reject a Post (Admin)**

1. **Reject Post (PUT)**  
   **PUT** `http://localhost:5000/api/admin/posts/:postId/reject`  
   Again, use the admin token for authorization.

#### **Delete a Comment (Admin)**

1. **Delete Comment (DELETE)**  
   **DELETE** `http://localhost:5000/api/admin/comments/:commentId`  
   Admin access is required. Ensure the comment exists and is linked to a post.

### **3️⃣ Test Post CRUD Operations**

#### **Create Post**

**POST** `http://localhost:5000/api/posts`  
Request body:

```json
{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["node", "express"]
}
```

Make sure to include the user’s JWT token in the authorization header.

#### **Get Posts with Pagination**

**GET** `http://localhost:5000/api/posts?page=1&limit=5`  
This will fetch the first 5 posts. You can change the `page` and `limit` query parameters.

#### **Get Posts with Filtering (Category/Tags)**

**GET** `http://localhost:5000/api/posts?category=Technology&tags=node,express&page=1&limit=5`  
This filters posts based on the category and tags. Test with different categories and tags.

#### **Update Post**

**PUT** `http://localhost:5000/api/posts/:postId`  
Request body:

```json
{
    "title": "Updated Blog Post Title",
    "content": "Updated content of the post."
}
```

#### **Delete Post**

**DELETE** `http://localhost:5000/api/posts/:postId`

### **4️⃣ Test Comments & Likes**

Make sure to test **comment creation** and **liking posts** to ensure these features are functioning as expected.

#### **Create Comment**

**POST** `http://localhost:5000/api/posts/:postId/comments`  
Request body:

```json
{
    "content": "This is a comment on the blog post."
}
```

#### **Like Post**

**POST** `http://localhost:5000/api/posts/:postId/like`  
This endpoint will increment the like count for a post.

---

## **5️⃣ Final Adjustments**

Ensure everything works well together:

-   **Admin moderation** (approve, reject posts)
-   **Comment management** (admin delete)
-   **Pagination and filtering** for efficient browsing
-   **Error handling** for invalid input, unauthorized access, etc.

### **Testing Tool Recommendations**

Use **Postman** or **Insomnia** to test the endpoints and ensure that:

-   **Authentication** (JWT tokens) works correctly.
-   **Admin roles** are restricted for certain actions.
-   All routes perform CRUD operations seamlessly.

---

If you’ve done the tests and everything works fine, the API should be ready for deployment! 🎉

Would you like to proceed with deployment instructions next or any final features before that?
