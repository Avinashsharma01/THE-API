# Blogging Platform API Documentation

## Directory Structure

```
blogging-platform-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── commentController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── config/
│   │   └── database.js
│   └── utils/
│       └── helpers.js
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Directory Explanation

### 1. `src/` Directory
The main source code directory containing all application logic.

#### Controllers (`src/controllers/`)
- `authController.js`: Handles authentication logic (login, register, logout)
- `blogController.js`: Manages blog post operations (CRUD)
- `commentController.js`: Handles comment functionality
- `userController.js`: Manages user-related operations

#### Models (`src/models/`)
Database schemas and models:
- `Blog.js`: Blog post schema
- `Comment.js`: Comment schema
- `User.js`: User schema

#### Routes (`src/routes/`)
API endpoint definitions:
- `authRoutes.js`: Authentication routes
- `blogRoutes.js`: Blog-related routes
- `userRoutes.js`: User management routes

#### Middleware (`src/middleware/`)
- `auth.js`: Authentication middleware
- `validation.js`: Request validation middleware

#### Config (`src/config/`)
- `database.js`: Database configuration

#### Utils (`src/utils/`)
- `helpers.js`: Utility functions

### 2. `tests/` Directory
Contains test files for the application

### 3. Root Files
- `.env`: Environment variables
- `.gitignore`: Git ignore configurations
- `package.json`: Project dependencies and scripts
- `README.md`: Project documentation

## API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
```

### Blog Posts
```
GET    /api/blogs - Get all blogs
POST   /api/blogs - Create new blog
GET    /api/blogs/:id - Get specific blog
PUT    /api/blogs/:id - Update blog
DELETE /api/blogs/:id - Delete blog
```

### Users
```
GET    /api/users - Get all users
GET    /api/users/:id - Get specific user
PUT    /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

### Comments
```
GET    /api/blogs/:blogId/comments - Get all comments for a blog
POST   /api/blogs/:blogId/comments - Create new comment
PUT    /api/comments/:id - Update comment
DELETE /api/comments/:id - Delete comment
```

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/your-username/blogging-platform-api.git
```

2. Install dependencies
```bash
cd blogging-platform-api
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Start the server
```bash
npm run dev  # for development
npm start    # for production
```

## Environment Variables
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Jest for testing

This documentation provides a clear structure for building a RESTful API for a blogging platform. The directory structure follows the MVC (Model-View-Controller) pattern and separation of concerns principle, making the code organized and maintainable.

Would you like me to provide more specific details about any particular component or create any specific files?