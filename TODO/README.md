Sure, Avinash Sharma! Here's a step-by-step guide to build a basic **To-Do API** in Node.js using **Express** and **MongoDB**:

---

### **Step 1: Set up your project**

1. **Initialize the project**:

    ```bash
    mkdir todo-api
    cd todo-api
    npm init -y
    ```

2. **Install required dependencies**:

    ```bash
    npm install express mongoose body-parser dotenv
    npm install --save-dev nodemon
    ```

    - `express`: For building the API.
    - `mongoose`: For interacting with MongoDB.
    - `body-parser`: To parse request bodies (optional since Express 4.16+ includes it).
    - `dotenv`: To manage environment variables.
    - `nodemon`: For automatically restarting the server during development.

---

### **Step 2: Set up the folder structure**

```
todo-api/
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── .env
├── app.js
├── package.json
└── README.md
```

---

### **Step 3: Connect to MongoDB**

1. Set up a `.env` file for environment variables:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/todo_db
    ```

2. In `app.js`, connect to MongoDB:

    ```javascript
    const express = require("express");
    const mongoose = require("mongoose");
    const dotenv = require("dotenv");

    dotenv.config();

    const app = express();

    // Middleware
    app.use(express.json());

    // MongoDB connection
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB connected..."))
        .catch((err) => console.error(err));

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```

---

### **Step 4: Create a To-Do model**

1. In `models/Todo.js`:

    ```javascript
    const mongoose = require("mongoose");

    const TodoSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

    module.exports = mongoose.model("Todo", TodoSchema);
    ```

---

### **Step 5: Create the routes**

1. In `routes/todoRoutes.js`:

    ```javascript
    const express = require("express");
    const router = express.Router();
    const Todo = require("../models/Todo");

    // Get all todos
    router.get("/", async (req, res) => {
        try {
            const todos = await Todo.find();
            res.json(todos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Create a new todo
    router.post("/", async (req, res) => {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        try {
            const newTodo = new Todo({ title });
            await newTodo.save();
            res.status(201).json(newTodo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update a todo
    router.put("/:id", async (req, res) => {
        const { title, completed } = req.body;

        try {
            const updatedTodo = await Todo.findByIdAndUpdate(
                req.params.id,
                { title, completed },
                { new: true }
            );
            if (!updatedTodo)
                return res.status(404).json({ error: "Todo not found" });
            res.json(updatedTodo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete a todo
    router.delete("/:id", async (req, res) => {
        try {
            const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
            if (!deletedTodo)
                return res.status(404).json({ error: "Todo not found" });
            res.json({ message: "Todo deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    module.exports = router;
    ```

---

### **Step 6: Hook up routes in `app.js`**

1. Update `app.js` to use the routes:

    ```javascript
    const todoRoutes = require("./routes/todoRoutes");

    app.use("/api/todos", todoRoutes);
    ```

---

### **Step 7: Run the server**

1. Add a `start` script in `package.json`:

    ```json
    "scripts": {
        "start": "node app.js",
        "dev": "nodemon app.js"
    }
    ```

2. Start the server:
    ```bash
    npm run dev
    ```

---

### **Step 8: Test the API**

Use a tool like **Postman** or **cURL** to test the endpoints:

-   `GET /api/todos`: Fetch all todos.
-   `POST /api/todos`: Create a new todo. (e.g., `{ "title": "Learn Node.js" }`)
-   `PUT /api/todos/:id`: Update a todo. (e.g., `{ "title": "Learn Express.js", "completed": true }`)
-   `DELETE /api/todos/:id`: Delete a todo.

---

This is a complete and extensible To-Do API. Let me know if you want to expand it, like adding user authentication or deploying it to a cloud platform! 🚀
