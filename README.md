# React + Node.js + MongoDB

A minimal full-stack application built with **React**, **Node.js**, **Express**, and **MongoDB**, with **Docker** and **Docker Compose** for containerized development and deployment.

The project demonstrates a clean and practical integration between a modern React frontend, a RESTful Node.js API, and a MongoDB database.

---

## Overview

This repository is a practical full-stack example focused on integrating:

* React for the frontend
* Node.js and Express for the backend API
* MongoDB for persistence
* Mongoose for MongoDB data modeling
* Docker for containerization
* Docker Compose for multi-container orchestration

The application intentionally remains small and focused. The goal is not to build a large business system, but to demonstrate how the individual technologies work together in a realistic full-stack environment.

---

## Architecture

```text
                    ┌────────────────────┐
                    │       React        │
                    │     Frontend       │
                    └─────────┬──────────┘
                              │
                              │ HTTP / REST
                              ▼
                    ┌────────────────────┐
                    │      Node.js       │
                    │      Express       │
                    │        API         │
                    └─────────┬──────────┘
                              │
                              │ Mongoose
                              ▼
                    ┌────────────────────┐
                    │      MongoDB       │
                    │      Database      │
                    └────────────────────┘
```

With Docker Compose:

```text
┌──────────────────────────────────────────────────────┐
│                  Docker Compose                      │
│                                                      │
│   ┌──────────────┐     ┌──────────────┐              │
│   │    React     │────▶│   Node.js    │              │
│   │  Container   │     │   Container  │              │
│   └──────────────┘     └───────┬──────┘              │
│                                │                     │
│                                ▼                     │
│                         ┌──────────────┐             │
│                         │   MongoDB    │             │
│                         │   Container  │             │
│                         └──────────────┘             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| React          | Frontend UI                            |
| Vite           | Frontend development and build tooling |
| Node.js        | Backend runtime                        |
| Express        | REST API                               |
| MongoDB        | NoSQL database                         |
| Mongoose       | MongoDB ODM                            |
| Docker         | Application containerization           |
| Docker Compose | Multi-container orchestration          |
| JavaScript     | Application language                   |

---

## Project Structure

```text
NodeJs/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Application

The sample application is intentionally minimal and demonstrates a simple CRUD workflow.

### Task Entity

```text
Task
├── id
├── title
├── description
├── completed
├── createdAt
└── updatedAt
```

### REST API

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Running Locally

### Prerequisites

Install:

* Node.js
* npm
* MongoDB

Clone the repository:

```bash
git clone https://github.com/KTajerbashi/NodeJs.git
cd NodeJs
```

---

### Start MongoDB

Make sure MongoDB is running locally.

The backend can then connect to a MongoDB instance using the configured connection string.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/react-node-mongodb
```

---

### Start the Backend

```bash
cd server
npm install
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

---

### Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The React application will be available at the URL displayed by Vite.

---

# Running with Docker

Docker is the recommended way to run the complete application.

The project uses Docker Compose to orchestrate:

```text
React
Node.js
MongoDB
```

Start the complete application:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Stop the application:

```bash
docker compose down
```

Stop and remove containers:

```bash
docker compose down
```

---

## Docker Services

The Docker Compose environment contains three services:

```text
client
server
mongodb
```

### Client

Runs the React application.

### Server

Runs the Node.js / Express REST API.

### MongoDB

Provides the application database.

The containers communicate through the Docker Compose network using service names instead of `localhost`.

For example, the backend connects to MongoDB using a connection string similar to:

```env
mongodb://mongodb:27017/react-node-mongodb
```

---

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/react-node-mongodb
```

Environment files containing secrets should never be committed to the repository.

---

## API Endpoints

### Get Tasks

```http
GET /api/tasks
```

### Get Task

```http
GET /api/tasks/:id
```

### Create Task

```http
POST /api/tasks
Content-Type: application/json
```

Example request:

```json
{
  "title": "Learn Docker",
  "description": "Containerize the full-stack application"
}
```

### Update Task

```http
PUT /api/tasks/:id
Content-Type: application/json
```

### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Docker Concepts Demonstrated

This project demonstrates several practical Docker concepts:

* Dockerfiles
* Docker images
* Docker containers
* Container networking
* Docker Compose
* Environment variables
* Port mapping
* Service-to-service communication
* MongoDB containerization
* Persistent database storage
* Multi-container application architecture

---

## Development Workflow

The project is designed to demonstrate two development approaches.

### Without Docker

```text
React
  ↓
Node.js
  ↓
Local MongoDB
```

### With Docker

```text
React Container
      ↓
Node.js Container
      ↓
MongoDB Container
```

This makes it possible to understand the application first and then introduce containerization without hiding the underlying architecture.

---

## Goals

The main goals of this repository are:

1. Build a minimal React frontend.
2. Build a RESTful Node.js API.
3. Connect Node.js to MongoDB.
4. Implement a simple CRUD workflow.
5. Containerize the frontend.
6. Containerize the backend.
7. Run MongoDB in a container.
8. Orchestrate the complete system using Docker Compose.
9. Demonstrate practical full-stack development and containerization.

---

## What This Repository Demonstrates

This project is intentionally different from a production-scale enterprise application.

It focuses on the fundamentals required to understand a modern JavaScript full-stack application:

```text
Frontend
   ↓
HTTP
   ↓
REST API
   ↓
Backend
   ↓
Database
```

and:

```text
Application
   ↓
Dockerfile
   ↓
Image
   ↓
Container
   ↓
Docker Compose
```

---

## Future Improvements

Possible future extensions include:

* Authentication and authorization
* JWT authentication
* Request validation
* Centralized error handling
* Automated testing
* React component testing
* API integration testing
* MongoDB indexes
* Health checks
* Docker health checks
* Production Docker images
* Nginx reverse proxy
* CI/CD with GitHub Actions
* Docker image publishing
* Production deployment

These features are intentionally kept outside the initial minimal implementation.

---

## Learning Path

A recommended progression for this repository is:

```text
1. React
      ↓
2. Node.js
      ↓
3. Express REST API
      ↓
4. MongoDB
      ↓
5. Mongoose
      ↓
6. React ↔ REST API
      ↓
7. Dockerfile
      ↓
8. Docker Image
      ↓
9. Docker Container
      ↓
10. Docker Compose
      ↓
11. Multi-container Application
```

---

## Repository Purpose

This repository is part of a broader collection of practical software development examples covering modern application development, backend technologies, frontend technologies, databases, architecture, and DevOps practices.

Each implementation is intentionally focused on a specific technology or concept so that it can be used as a reference and learning resource.

---

## License

This project is available for educational and portfolio purposes.
