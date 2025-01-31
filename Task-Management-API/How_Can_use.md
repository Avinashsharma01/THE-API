To use this **Task Management API**, follow these steps:

---

## **📌 1. Start the API Server**

First, make sure your MongoDB database is running. If you're using **MongoDB Atlas**, replace `MONGO_URI` in the `.env` file with your connection string.

Now, start your Node.js server:

```sh
node server.js
```

or if you're using **nodemon**:

```sh
npx nodemon server.js
```

---

## **📌 2. Register a User**

To register a user, send a **POST** request to:

```
POST http://localhost:5000/api/auth/register
```

### **Request Body (JSON)**

```json
{
    "name": "Avinash Sharma",
    "email": "avinash@example.com",
    "password": "password123",
    "role": "admin"
}
```

### **Response**

```json
{
    "message": "User registered successfully!"
}
```

---

## **📌 3. Login to Get JWT Token**

To authenticate, send a **POST** request to:

```
POST http://localhost:5000/api/auth/login
```

### **Request Body (JSON)**

```json
{
    "email": "avinash@example.com",
    "password": "password123"
}
```

### **Response**

```json
{
    "token": "your_jwt_token_here"
}
```

Copy this **token**, as you’ll need it for making authenticated API requests.

---

## **📌 4. Create a Task**

To create a task, send a **POST** request to:

```
POST http://localhost:5000/api/tasks
```

### **Headers**

```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

### **Request Body (JSON)**

```json
{
    "title": "Complete Project",
    "description": "Finish the Task Management API",
    "priority": "high",
    "deadline": "2024-10-10",
    "assignedTo": "user_id_here"
}
```

### **Response**

```json
{
    "_id": "task_id_here",
    "title": "Complete Project",
    "description": "Finish the Task Management API",
    "priority": "high",
    "deadline": "2024-10-10",
    "assignedTo": "user_id_here",
    "createdBy": "your_user_id"
}
```

---

## **📌 5. Get All Tasks**

To retrieve all tasks, send a **GET** request to:

```
GET http://localhost:5000/api/tasks
```

### **Headers**

```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

### **Response**

```json
[
    {
        "_id": "task_id_here",
        "title": "Complete Project",
        "description": "Finish the Task Management API",
        "priority": "high",
        "deadline": "2024-10-10",
        "assignedTo": "user_id_here",
        "createdBy": "your_user_id"
    }
]
```

---

## **📌 6. Update a Task**

To update a task, send a **PUT** request to:

```
PUT http://localhost:5000/api/tasks/task_id_here
```

### **Headers**

```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

### **Request Body (JSON)**

```json
{
    "status": "completed"
}
```

### **Response**

```json
{
    "_id": "task_id_here",
    "title": "Complete Project",
    "description": "Finish the Task Management API",
    "status": "completed"
}
```

---

## **📌 7. Delete a Task**

To delete a task, send a **DELETE** request to:

```
DELETE http://localhost:5000/api/tasks/task_id_here
```

### **Headers**

```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

### **Response**

```json
{
    "message": "Task deleted"
}
```

---

## **📌 8. Filtering Tasks**

You can filter tasks using query parameters:

### **Filter by Status**

```
GET http://localhost:5000/api/tasks?status=completed
```

### **Filter by Priority**

```
GET http://localhost:5000/api/tasks?priority=high
```

### **Filter by Deadline**

```
GET http://localhost:5000/api/tasks?deadline=2024-10-10
```

---

## **📌 9. Role-Based Access Control**

If you implement **RBAC** (Role-Based Access Control), you can restrict access to certain routes based on user roles.

For example, only **admins** should be able to delete tasks. You can modify `middleware/rbac.js` to enforce this.

---

## **✅ Ready to Use!**

You can now use **Postman** or **Thunder Client** in VS Code to test your API. If you want to integrate this API into a frontend, you can use React, Angular, or any other framework.

Would you like me to help with the frontend part too? 🚀
