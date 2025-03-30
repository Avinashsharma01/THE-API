# BookAPI Documentation

A RESTful API for managing a collection of books built with Node.js, Express, and MongoDB.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Error Handling](#error-handling)

## Overview

BookAPI is a simple and efficient RESTful API that allows you to perform CRUD operations on a collection of books. The API is built using Node.js, Express, and MongoDB, providing a robust and scalable solution for book management.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd BookAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:3000/api/book
```

### Available Endpoints

#### 1. Get All Books
- **Method**: GET
- **Endpoint**: `/get`
- **Description**: Retrieves all books from the database
- **Response**: Array of book objects

#### 2. Get Single Book
- **Method**: GET
- **Endpoint**: `/get/:id`
- **Description**: Retrieves a specific book by ID
- **Parameters**: 
  - `id`: MongoDB document ID
- **Response**: Single book object

#### 3. Add New Book
- **Method**: POST
- **Endpoint**: `/add`
- **Description**: Creates a new book entry
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "year": 2024
  }
  ```
- **Response**: Created book object

#### 4. Update Book
- **Method**: PUT
- **Endpoint**: `/update/:id`
- **Description**: Updates an existing book
- **Parameters**:
  - `id`: MongoDB document ID
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2024
  }
  ```
- **Response**: Updated book object

#### 5. Delete Book
- **Method**: DELETE
- **Endpoint**: `/delete/:id`
- **Description**: Deletes a book from the database
- **Parameters**:
  - `id`: MongoDB document ID
- **Response**: Deleted book object

## Data Model

### Book Schema
```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1000,
    max: current_year
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API implements standard HTTP status codes:
- 200: Success
- 500: Internal Server Error

All endpoints include proper error handling and return appropriate error messages in case of failures.

## Project Structure

```
BookAPI/
├── controller/
│   └── book_controller.js
├── database/
│   └── db.js
├── models/
│   └── book_model.js
├── routes/
│   └── book_routes.js
├── server.js
├── .env
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests! 




I'll help you create documentation for the BookAPI directory. First, let me check the contents of the directory to understand its structure and components.


Ran tool
Let me examine some key files to understand the API's functionality better.


Read file: BookAPI/server.js
Let me check the routes to understand the available endpoints.


Read file: BookAPI/routes/book_routes.js
Let me check the controller to understand the business logic.



Read file: BookAPI/controller/book_controller.js
Let me check the model to understand the data structure.


Read file: BookAPI/models/book_model.js
Based on my analysis, I'll create a comprehensive documentation for the BookAPI. I'll create a new README.md file in the BookAPI directory.


```markdown:BookAPI/README.md
# BookAPI Documentation

A RESTful API for managing a collection of books built with Node.js, Express, and MongoDB.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Error Handling](#error-handling)

## Overview

BookAPI is a simple and efficient RESTful API that allows you to perform CRUD operations on a collection of books. The API is built using Node.js, Express, and MongoDB, providing a robust and scalable solution for book management.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd BookAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:3000/api/book
```

### Available Endpoints

#### 1. Get All Books
- **Method**: GET
- **Endpoint**: `/get`
- **Description**: Retrieves all books from the database
- **Response**: Array of book objects

#### 2. Get Single Book
- **Method**: GET
- **Endpoint**: `/get/:id`
- **Description**: Retrieves a specific book by ID
- **Parameters**: 
  - `id`: MongoDB document ID
- **Response**: Single book object

#### 3. Add New Book
- **Method**: POST
- **Endpoint**: `/add`
- **Description**: Creates a new book entry
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "year": 2024
  }
  ```
- **Response**: Created book object

#### 4. Update Book
- **Method**: PUT
- **Endpoint**: `/update/:id`
- **Description**: Updates an existing book
- **Parameters**:
  - `id`: MongoDB document ID
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2024
  }
  ```
- **Response**: Updated book object

#### 5. Delete Book
- **Method**: DELETE
- **Endpoint**: `/delete/:id`
- **Description**: Deletes a book from the database
- **Parameters**:
  - `id`: MongoDB document ID
- **Response**: Deleted book object

## Data Model

### Book Schema
```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1000,
    max: current_year
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API implements standard HTTP status codes:
- 200: Success
- 500: Internal Server Error

All endpoints include proper error handling and return appropriate error messages in case of failures.

## Project Structure

```
BookAPI/
├── controller/
│   └── book_controller.js
├── database/
│   └── db.js
├── models/
│   └── book_model.js
├── routes/
│   └── book_routes.js
├── server.js
├── .env
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests!
```
I've created a comprehensive README.md file for the BookAPI project. The documentation includes:

1. A clear overview of the project
2. Prerequisites for running the API
3. Installation instructions
4. Detailed API endpoint documentation
5. Data model specification
6. Error handling information
7. Project structure
8. Contributing guidelines

The documentation covers all the essential aspects of the API, including:
- All available endpoints (GET, POST, PUT, DELETE)
- Request/response formats
- Data validation rules
- Error handling
- Project setup instructions

The documentation is formatted in Markdown for easy reading on GitHub or any other Markdown viewer. You can find it in the `BookAPI/README.md` file.

Is there any specific section of the documentation you'd like me to expand upon or clarify?
