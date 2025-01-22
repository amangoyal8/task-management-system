# task-management-system

A full-stack task management system built with:

Node.js (Backend)

React.js (Frontend)

MongoDB (Database)

JWT for user authentication

This system supports role-based access control:

Admin: Can view all tasks created by all users.

User: Can view, create, edit, and delete only their own tasks.

Features

User Authentication:

User registration and login with hashed passwords.

JWT-based authentication for secure access.

Role-Based Access Control:

Admins can view all tasks.

Users can only view their own tasks.

Task Management:

Create, Read, Update, and Delete (CRUD) operations for tasks.

Tasks have a status: Pending, In Progress, or Completed.

Filtering:

Filter tasks by their status.

Installation

Prerequisites

Ensure you have the following installed:

Node.js

MongoDB

npm or yarn

Backend Setup

Clone the repository and navigate to the backend folder:

git clone <repository-url>
cd backend

Install dependencies:

npm install

Create a .env file and configure the following:

PORT=5000
MONGO_URI=<your_mongo_database_connection_string>
JWT_SECRET=<your_jwt_secret_key>

Start the server:

npm start

The backend will run on http://localhost:5000.

Frontend Setup

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the development server:

npm start

The frontend will run on http://localhost:3000.

API Endpoints

Authentication

Register User

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "role": "User" // or "Admin"
}

Login User

POST /api/auth/login

Request Body:

{
  "email": "john@example.com",
  "password": "password"
}

Response:

{
  "token": "<jwt_token>",
  "role": "User"
}

Task Management

Get Tasks

GET /api/tasks

Query Parameters:

status (optional): Filter by Pending, In Progress, or Completed.

Headers:

{
  "Authorization": "Bearer <jwt_token>"
}

Create Task

POST /api/tasks

Request Body:

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "Pending"
}

Headers:

{
  "Authorization": "Bearer <jwt_token>"
}

Update Task

PUT /api/tasks/:id

Request Body:

{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "In Progress"
}

Headers:

{
  "Authorization": "Bearer <jwt_token>"
}

Delete Task

DELETE /api/tasks/:id

Headers:

{
  "Authorization": "Bearer <jwt_token>"
}

Usage

Admin Role:

Can view all tasks from all users.

Access tasks via the /api/tasks endpoint without filters.

User Role:

Can view, create, edit, and delete their own tasks.

Tasks are filtered by their userId automatically on the backend.