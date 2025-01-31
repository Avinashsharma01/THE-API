Great! Now, let's implement **User Authentication** using **JWT (JSON Web Token)** for secure login and signup.

---

# **Step 3: User Authentication**

### **Features:**

✅ User **Sign-up** (Registration)  
✅ User **Login** (Authentication)  
✅ **Password Hashing** using bcrypt  
✅ **JWT Token Authentication**

---

## **1️⃣ Create the User Model**

Create a new file:  
📂 `src/models/User.js`

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", userSchema);
```

---

## **2️⃣ Create Authentication Controller**

Create:  
📂 `src/controllers/authController.js`

```javascript
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// @route   POST /api/auth/signup
// @desc    Register a new user
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        res.json({ token: generateToken(user), userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
```

---

## **3️⃣ Create Authentication Routes**

Create:  
📂 `src/routes/authRoutes.js`

```javascript
const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
```

---

## **4️⃣ Protect Routes with Middleware**

Create:  
📂 `src/middleware/authMiddleware.js`

```javascript
const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
```

---

## **5️⃣ Integrate Routes in Server**

Modify:  
📂 `src/index.js`

```javascript
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
```

---

## **6️⃣ Test API using Postman**

### **Register a User (Sign-Up)**

**POST** `http://localhost:5000/api/auth/signup`  
**Body (JSON)**

```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456"
}
```

### **Login User**

**POST** `http://localhost:5000/api/auth/login`  
**Body (JSON)**

```json
{
    "email": "john@example.com",
    "password": "123456"
}
```

✅ If successful, you'll receive a **JWT Token**.

---

## **Next Step: Blog Post CRUD**

Now, should we continue with **Blog Post CRUD operations**? 🚀
