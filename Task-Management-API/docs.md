Yes! Let's break it down step by step and build a **Task Management API** in **Node.js** using **Express.js** and **MongoDB** (Mongoose).

### 📌 **Tech Stack**

-   **Node.js** with **Express.js** (backend framework)
-   **MongoDB** with **Mongoose** (database)
-   **JWT** for authentication
-   **bcrypt** for password hashing
-   **Middleware** for authentication & role-based access control (RBAC)

---

## 🛠 **Steps to Build the API**

1. **Initialize the project** (`npm init -y`)
2. **Install dependencies** (`express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `dotenv`, `cors`, etc.)
3. **Set up MongoDB connection**
4. **Create models** (User, Project, Task)
5. **Implement authentication** (JWT-based login/signup)
6. **Create CRUD operations** for tasks
7. **Implement filtering** (status, priority, deadline)
8. **Set up role-based access control (RBAC)**

---

## **Project Structure**

```
task-management-api/
│── config/
│   ├── db.js          # Database connection
│── middleware/
│   ├── auth.js        # JWT authentication middleware
│   ├── rbac.js        # Role-based access control
│── models/
│   ├── User.js        # User model
│   ├── Project.js     # Project model
│   ├── Task.js        # Task model
│── routes/
│   ├── authRoutes.js  # User authentication routes
│   ├── taskRoutes.js  # Task CRUD operations
│   ├── projectRoutes.js # Project management routes
│── controllers/
│   ├── authController.js # Authentication logic
│   ├── taskController.js # Task CRUD logic
│   ├── projectController.js # Project logic
│── server.js         # Entry point
│── .env             # Environment variables
│── package.json
```

---

## **🔹 Step 1: Initialize the Project**

Run the following command in your terminal:

```sh
mkdir task-management-api
cd task-management-api
npm init -y
```

---

## **🔹 Step 2: Install Dependencies**

```sh
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
npm install --save-dev nodemon
```

---

## **🔹 Step 3: Set Up MongoDB Connection** (`config/db.js`)

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
```

Add `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## **🔹 Step 4: Create Models**

### **User Model (`models/User.js`)**

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
```

---

### **Task Model (`models/Task.js`)**

```javascript
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        deadline: Date,
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
```

---

## **🔹 Step 5: Authentication & JWT Middleware**

### **Auth Middleware (`middleware/auth.js`)**

```javascript
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied!" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token!" });
    }
};
```

---

## **🔹 Step 6: Implement Role-Based Access Control (RBAC)**

### **RBAC Middleware (`middleware/rbac.js`)**

```javascript
module.exports = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied!" });
        }
        next();
    };
};
```

---

## **🔹 Step 7: Authentication Routes**

### **Auth Controller (`controllers/authController.js`)**

```javascript
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.json({ message: "User registered successfully!" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.json({ token });
};
```

---

### **Auth Routes (`routes/authRoutes.js`)**

```javascript
const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

---

## **🔹 Step 8: Task CRUD Routes**

### **Task Controller (`controllers/taskController.js`)**

```javascript
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    const { title, description, priority, deadline, assignedTo } = req.body;
    const task = new Task({
        title,
        description,
        priority,
        deadline,
        assignedTo,
        createdBy: req.user.id,
    });
    await task.save();
    res.json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find().populate("assignedTo");
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
};
```

---

### **Task Routes (`routes/taskRoutes.js`)**

```javascript
const express = require("express");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
```

---

## **🔹 Step 9: Start the Server (`server.js`)**

```javascript
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

connectDB();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
```

Now, start the server:

```sh
node server.js
```

Your Task Management API is ready! 🚀
