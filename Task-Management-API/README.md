# Task Management API

A robust RESTful API built with Node.js, Express.js, and MongoDB for managing tasks and projects with authentication and role-based access control.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
- [Database Models](#database-models)
- [Middleware](#middleware)

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Additional Tools**: CORS, dotenv

## 📁 Project Structure
```
task-management-api/
│── config/
│   ├── db.js          # Database connection configuration
│── middleware/
│   ├── auth.js        # JWT authentication middleware
│   ├── rbac.js        # Role-based access control
│── models/
│   ├── User.js        # User schema and model
│   ├── Task.js        # Task schema and model
│── routes/
│   ├── authRoutes.js  # Authentication routes
│   ├── taskRoutes.js  # Task management routes
│── controllers/
│   ├── authController.js # Authentication logic
│   ├── taskController.js # Task CRUD operations
│── server.js          # Application entry point
│── .env              # Environment variables
│── package.json      # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

### Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📚 API Documentation

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Description**: Create a new user account
- **Request Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
}
```
- **Response**: `200 OK` with success message

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Description**: Authenticate user and get token
- **Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response**: `200 OK` with JWT token

### Tasks

#### Create Task
- **Endpoint**: `POST /api/tasks`
- **Access**: Protected (requires JWT)
- **Description**: Create a new task
- **Request Body**:
```json
{
    "title": "Complete Project",
    "description": "Finish the API documentation",
    "priority": "high",
    "deadline": "2024-03-20T00:00:00.000Z",
    "assignedTo": "user_id"
}
```
- **Response**: `200 OK` with created task object

#### Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Access**: Protected (requires JWT)
- **Description**: Retrieve all tasks
- **Response**: Array of task objects

#### Update Task
- **Endpoint**: `PUT /api/tasks/:id`
- **Access**: Protected (requires JWT)
- **Description**: Update an existing task
- **Request Body**: Any task fields to update
- **Response**: `200 OK` with updated task object

#### Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Access**: Protected (requires JWT)
- **Description**: Delete a task
- **Response**: `200 OK` with success message

## 💾 Database Models

### User Model
```javascript
{
    name: String,
    email: String (unique),
    password: String (hashed),
    role: String (enum: ["admin", "user"])
}
```

### Task Model
```javascript
{
    title: String,
    description: String,
    status: String (enum: ["pending", "in-progress", "completed"]),
    priority: String (enum: ["low", "medium", "high"]),
    deadline: Date,
    assignedTo: ObjectId (ref: "User"),
    createdBy: ObjectId (ref: "User"),
    timestamps: true
}
```

## 🔒 Middleware

### Authentication Middleware
- Validates JWT tokens
- Adds user information to request object
- Handles unauthorized access

### RBAC (Role-Based Access Control)
- Controls access based on user roles
- Supports "admin" and "user" roles
- Prevents unauthorized operations

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details



I'll help you create comprehensive documentation for the Task Management API. Here's a well-structured README.md file:

```markdown:Task-Management-API/README.md
# Task Management API

A robust RESTful API built with Node.js, Express.js, and MongoDB for managing tasks and projects with authentication and role-based access control.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
- [Database Models](#database-models)
- [Middleware](#middleware)

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Additional Tools**: CORS, dotenv

## 📁 Project Structure
```
task-management-api/
│── config/
│   ├── db.js          # Database connection configuration
│── middleware/
│   ├── auth.js        # JWT authentication middleware
│   ├── rbac.js        # Role-based access control
│── models/
│   ├── User.js        # User schema and model
│   ├── Task.js        # Task schema and model
│── routes/
│   ├── authRoutes.js  # Authentication routes
│   ├── taskRoutes.js  # Task management routes
│── controllers/
│   ├── authController.js # Authentication logic
│   ├── taskController.js # Task CRUD operations
│── server.js          # Application entry point
│── .env              # Environment variables
│── package.json      # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

### Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📚 API Documentation

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Description**: Create a new user account
- **Request Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
}
```
- **Response**: `200 OK` with success message

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Description**: Authenticate user and get token
- **Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response**: `200 OK` with JWT token

### Tasks

#### Create Task
- **Endpoint**: `POST /api/tasks`
- **Access**: Protected (requires JWT)
- **Description**: Create a new task
- **Request Body**:
```json
{
    "title": "Complete Project",
    "description": "Finish the API documentation",
    "priority": "high",
    "deadline": "2024-03-20T00:00:00.000Z",
    "assignedTo": "user_id"
}
```
- **Response**: `200 OK` with created task object

#### Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Access**: Protected (requires JWT)
- **Description**: Retrieve all tasks
- **Response**: Array of task objects

#### Update Task
- **Endpoint**: `PUT /api/tasks/:id`
- **Access**: Protected (requires JWT)
- **Description**: Update an existing task
- **Request Body**: Any task fields to update
- **Response**: `200 OK` with updated task object

#### Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Access**: Protected (requires JWT)
- **Description**: Delete a task
- **Response**: `200 OK` with success message

## 💾 Database Models

### User Model
```javascript
{
    name: String,
    email: String (unique),
    password: String (hashed),
    role: String (enum: ["admin", "user"])
}
```

### Task Model
```javascript
{
    title: String,
    description: String,
    status: String (enum: ["pending", "in-progress", "completed"]),
    priority: String (enum: ["low", "medium", "high"]),
    deadline: Date,
    assignedTo: ObjectId (ref: "User"),
    createdBy: ObjectId (ref: "User"),
    timestamps: true
}
```

## 🔒 Middleware

### Authentication Middleware
- Validates JWT tokens
- Adds user information to request object
- Handles unauthorized access

### RBAC (Role-Based Access Control)
- Controls access based on user roles
- Supports "admin" and "user" roles
- Prevents unauthorized operations

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details
```

This documentation provides:
1. Clear project structure explanation
2. Detailed API endpoints with request/response examples
3. Setup instructions
4. Database models overview
5. Middleware explanations
6. Contributing guidelines

The documentation is designed to help other developers:
- Quickly understand the project structure
- Set up the project locally
- Use the API endpoints correctly
- Understand the data models
- Contribute to the project effectively

You can further customize this documentation by adding:
- Specific error codes and responses
- More detailed API examples
- Testing instructions
- Deployment guidelines
- Troubleshooting section

Would you like me to expand on any particular section?
