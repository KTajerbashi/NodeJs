# Development Guide

This document explains how to run and develop the full-stack application locally without Docker.

The current development architecture is:

```text
React + Vite
      ↓
Node.js + Express
      ↓
MongoDB
```

Docker will be introduced later as a separate stage.

---

## 1. Project Architecture

```text
13.NodeJs/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
├── docker-compose.yml
└── README.md
```

---

# 2. Technologies

## Frontend

* React
* TypeScript
* Vite
* React Router

## Backend

* Node.js
* Express.js
* TypeScript
* Mongoose
* MongoDB
* CORS
* dotenv
* tsx

## Development Tools

* npm
* concurrently

Docker will be used later for containerization.

---

# 3. Local Development Environment

Docker is **not required** during the initial development stage.

The application runs directly on the host machine:

```text
Host Machine
│
├── React / Vite
│
├── Node.js / Express
│
└── MongoDB
```

Current local ports:

| Service        |  Port | URL                       |
| -------------- | ----: | ------------------------- |
| React / Vite   |  3200 | http://localhost:3200     |
| Node / Express |  5000 | http://localhost:5000     |
| MongoDB        | 27017 | mongodb://localhost:27017 |

---

# 4. Install Dependencies

From the project root:

```powershell
npm install
```

Install Client dependencies:

```powershell
npm --prefix ./client install
```

Install Server dependencies:

```powershell
npm --prefix ./server install
```

---

# 5. Environment Variables

The backend uses environment variables for configuration.

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/full_stack_app
```

Do not commit `.env` to Git.

Use `.env.example` to document the required variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/full_stack_app
```

---

# 6. MongoDB

During local development, MongoDB runs directly on the host machine.

Default MongoDB port:

```text
27017
```

Example connection string:

```text
mongodb://localhost:27017/full_stack_app
```

The backend reads this value from:

```text
MONGODB_URI
```

---

# 7. Start the Complete Application

The recommended command during development is:

```powershell
npm start
```

This starts both Client and Server:

```text
npm start
     │
     ├── React / Vite
     │
     └── Node.js / Express
           │
           └── MongoDB
```

Expected services:

```text
React
http://localhost:3200

Node.js / Express
http://localhost:5000

MongoDB
localhost:27017
```

---

# 8. Start Only the Client

From the project root:

```powershell
npm run start:client
```

This executes:

```text
npm --prefix ./client run start
```

The React application will run on:

```text
http://localhost:3200
```

The Client uses Vite.

---

# 9. Start Only the Server

From the project root:

```powershell
npm run start:server
```

This executes:

```text
npm --prefix ./server run dev
```

The Node.js / Express server will run on:

```text
http://localhost:5000
```

The backend uses:

```text
tsx watch
```

so source changes automatically restart the server.

---

# 10. Development Scripts

The root `package.json` contains the following commands:

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm start`            | Start Client + Server     |
| `npm run start:client` | Start Client only         |
| `npm run start:server` | Start Server only         |
| `npm run build`        | Build Client + Server     |
| `npm run start:prod`   | Run the built application |

### Root scripts

```json
{
  "scripts": {
    "start": "concurrently --raw \"npm --prefix ./client run start\" \"npm --prefix ./server run dev\"",
    "start:client": "npm --prefix ./client run start",
    "start:server": "npm --prefix ./server run dev",
    "build": "npm --prefix ./server run build && npm --prefix ./client run build",
    "start:prod": "concurrently --raw \"npm --prefix ./client run preview\" \"npm --prefix ./server run start\""
  }
}
```

---

# 11. Frontend Development

The Client uses Vite.

Start Client:

```powershell
npm run start:client
```

Or start the complete application:

```powershell
npm start
```

Client URL:

```text
http://localhost:3200
```

Vite provides Hot Module Replacement (HMR).

Therefore, when React source files change, the browser updates automatically.

No manual restart is required.

---

# 12. Backend Development

The Server uses:

```text
tsx watch
```

Server script:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

Start Server only:

```powershell
npm run start:server
```

Or start everything:

```powershell
npm start
```

When backend source code changes:

```text
Source Code
     ↓
tsx watch detects change
     ↓
Node.js server restarts
```

No manual build is required during development.

---

# 13. Important Development Rule

During normal development:

```powershell
npm start
```

is enough.

You do **not** need to run:

```powershell
npm run build
```

after every change.

You also do **not** need to stop and restart the application after backend changes.

The development environment uses:

```text
React
 ↓
Vite HMR

Node.js
 ↓
tsx watch
```

---

# 14. Backend Startup Flow

The backend startup process is:

```text
server.ts
   ↓
Load environment variables
   ↓
Connect to MongoDB
   ↓
Start Express
   ↓
Listen on port 5000
```

The server connects to MongoDB before starting Express.

Therefore:

```text
MongoDB connection
       ↓
Successful
       ↓
Express starts
```

---

# 15. Express Application

The Express application is defined in:

```text
server/src/app.ts
```

The application includes:

* CORS
* JSON body parsing
* Health endpoint
* User routes

Example:

```typescript
app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.use("/api/users", userRoutes);
```

---

# 16. Health Check

Backend health endpoint:

```http
GET /health
```

URL:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

This confirms that Express is running.

---

# 17. Testing the Backend

## Browser

Open:

```text
http://localhost:5000/health
```

Expected:

```json
{
  "status": "ok"
}
```

## PowerShell

Run:

```powershell
Invoke-RestMethod http://localhost:5000/health
```

Expected:

```text
status
------
ok
```

---

# 18. User API

User routes are mounted under:

```text
/api/users
```

Base URL:

```text
http://localhost:5000/api/users
```

Example:

```http
GET http://localhost:5000/api/users
```

The complete CRUD API is implemented through the User routes, controllers, services, repositories, and Mongoose models.

---

# 19. Build

Build the complete application:

```powershell
npm run build
```

The build process is:

```text
Server
  ↓
TypeScript Compiler
  ↓
dist/

Client
  ↓
TypeScript Compiler
  ↓
Vite Build
  ↓
dist/
```

The build command is intended for:

* Production preparation
* Deployment
* CI/CD
* Docker image creation

It is **not required for normal development**.

---

# 20. Production Start

After creating a build:

```powershell
npm run start:prod
```

This runs the built Server and Client preview.

The current implementation is intended primarily for local verification of the production build.

For the final Dockerized production architecture, React will be served through Nginx.

---

# 21. Development vs Production

## Development

```text
npm start
```

Uses:

```text
React
  ↓
Vite

Node.js
  ↓
tsx watch
```

Features:

* Hot Module Replacement
* Automatic backend restart
* No manual build
* Fast development cycle

---

## Build

```text
npm run build
```

Creates production build artifacts.

---

## Production Verification

```text
npm run start:prod
```

Runs the generated build.

---

# 22. Troubleshooting

## Client does not start

Run:

```powershell
npm run start:client
```

Expected:

```text
Local: http://localhost:3200/
```

---

## Server does not start

Run:

```powershell
npm run start:server
```

Expected:

```text
MongoDB connected.
Server running on http://localhost:5000
```

---

## MongoDB connection problem

Check the MongoDB service:

```powershell
Get-Service MongoDB
```

Expected:

```text
Status
------
Running
```

Check MongoDB port:

```powershell
Test-NetConnection localhost -Port 27017
```

Expected:

```text
TcpTestSucceeded : True
```

---

## Port 5000 is already in use

Check:

```powershell
Get-NetTCPConnection -LocalPort 5000
```

Stop the conflicting process or change:

```env
PORT=5000
```

to another available port.

---

## Port 3200 is already in use

Check:

```powershell
Get-NetTCPConnection -LocalPort 3200
```

The Vite port can be changed in:

```text
client/package.json
```

---

# 23. Recommended Development Workflow

```text
1. Start MongoDB
        ↓
2. Open project root
        ↓
3. Run npm start
        ↓
4. Develop React
        ↓
5. Develop Node.js / Express
        ↓
6. Test APIs
        ↓
7. Test frontend
        ↓
8. Fix issues
        ↓
9. Run npm run build
        ↓
10. Prepare for deployment
```

During steps 3–8:

```text
No manual build
No manual server restart
```

---

# 24. Backend Architecture

The preferred backend architecture is:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository / Model
  ↓
MongoDB
```

Business logic should not be placed directly inside Express routes.

The goal is to keep the backend:

* Maintainable
* Testable
* Scalable
* Easy to understand
* Easy to Dockerize

---

# 25. Dockerization Stage

Docker is intentionally not required during the first development stage.

The application should first work correctly without Docker.

Later, the architecture will become:

```text
Browser
   ↓
React / Nginx Container
   ↓
Node.js / Express Container
   ↓
MongoDB Container
```

Docker Compose will manage:

```text
Frontend
Backend
MongoDB
Network
Volume
Environment Variables
Health Checks
```

MongoDB will use a named Docker volume for persistent data.

---

# 26. Docker Networking

Local development:

```text
mongodb://localhost:27017/full_stack_app
```

Docker:

```text
mongodb://mongodb:27017/full_stack_app
```

Inside Docker, containers must not use:

```text
localhost
```

to communicate with another container.

Docker Compose service names are used instead:

```text
backend
   ↓
mongodb:27017
```

This distinction will be covered during the Dockerization stage.

---

# 27. Final Command Reference

### Complete development environment

```powershell
npm start
```

### Client only

```powershell
npm run start:client
```

### Server only

```powershell
npm run start:server
```

### Build everything

```powershell
npm run build
```

### Run production build

```powershell
npm run start:prod
```

### Client direct command

```powershell
npm --prefix ./client run start
```

### Server direct command

```powershell
npm --prefix ./server run dev
```

---

# 28. Core Principle

> **First make the application work. Then make it portable.**

Application architecture:

```text
React
+
Node.js
+
MongoDB
```

Container architecture will be introduced later:

```text
React Container
+
Node.js Container
+
MongoDB Container
+
Docker Network
+
Docker Volume
+
Docker Compose
```

Docker is the runtime and deployment environment.

It is not the application architecture.
# Development Guide

This document explains how to run and develop the full-stack application locally without Docker.

The current development architecture is:

```text
React + Vite
      ↓
Node.js + Express
      ↓
MongoDB
```

Docker will be introduced later as a separate stage.

---

## 1. Project Architecture

```text
13.NodeJs/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
├── docker-compose.yml
└── README.md
```

---

# 2. Technologies

## Frontend

* React
* TypeScript
* Vite
* React Router

## Backend

* Node.js
* Express.js
* TypeScript
* Mongoose
* MongoDB
* CORS
* dotenv
* tsx

## Development Tools

* npm
* concurrently

Docker will be used later for containerization.

---

# 3. Local Development Environment

Docker is **not required** during the initial development stage.

The application runs directly on the host machine:

```text
Host Machine
│
├── React / Vite
│
├── Node.js / Express
│
└── MongoDB
```

Current local ports:

| Service        |  Port | URL                       |
| -------------- | ----: | ------------------------- |
| React / Vite   |  3200 | http://localhost:3200     |
| Node / Express |  5000 | http://localhost:5000     |
| MongoDB        | 27017 | mongodb://localhost:27017 |

---

# 4. Install Dependencies

From the project root:

```powershell
npm install
```

Install Client dependencies:

```powershell
npm --prefix ./client install
```

Install Server dependencies:

```powershell
npm --prefix ./server install
```

---

# 5. Environment Variables

The backend uses environment variables for configuration.

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/full_stack_app
```

Do not commit `.env` to Git.

Use `.env.example` to document the required variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/full_stack_app
```

---

# 6. MongoDB

During local development, MongoDB runs directly on the host machine.

Default MongoDB port:

```text
27017
```

Example connection string:

```text
mongodb://localhost:27017/full_stack_app
```

The backend reads this value from:

```text
MONGODB_URI
```

---

# 7. Start the Complete Application

The recommended command during development is:

```powershell
npm start
```

This starts both Client and Server:

```text
npm start
     │
     ├── React / Vite
     │
     └── Node.js / Express
           │
           └── MongoDB
```

Expected services:

```text
React
http://localhost:3200

Node.js / Express
http://localhost:5000

MongoDB
localhost:27017
```

---

# 8. Start Only the Client

From the project root:

```powershell
npm run start:client
```

This executes:

```text
npm --prefix ./client run start
```

The React application will run on:

```text
http://localhost:3200
```

The Client uses Vite.

---

# 9. Start Only the Server

From the project root:

```powershell
npm run start:server
```

This executes:

```text
npm --prefix ./server run dev
```

The Node.js / Express server will run on:

```text
http://localhost:5000
```

The backend uses:

```text
tsx watch
```

so source changes automatically restart the server.

---

# 10. Development Scripts

The root `package.json` contains the following commands:

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm start`            | Start Client + Server     |
| `npm run start:client` | Start Client only         |
| `npm run start:server` | Start Server only         |
| `npm run build`        | Build Client + Server     |
| `npm run start:prod`   | Run the built application |

### Root scripts

```json
{
  "scripts": {
    "start": "concurrently --raw \"npm --prefix ./client run start\" \"npm --prefix ./server run dev\"",
    "start:client": "npm --prefix ./client run start",
    "start:server": "npm --prefix ./server run dev",
    "build": "npm --prefix ./server run build && npm --prefix ./client run build",
    "start:prod": "concurrently --raw \"npm --prefix ./client run preview\" \"npm --prefix ./server run start\""
  }
}
```

---

# 11. Frontend Development

The Client uses Vite.

Start Client:

```powershell
npm run start:client
```

Or start the complete application:

```powershell
npm start
```

Client URL:

```text
http://localhost:3200
```

Vite provides Hot Module Replacement (HMR).

Therefore, when React source files change, the browser updates automatically.

No manual restart is required.

---

# 12. Backend Development

The Server uses:

```text
tsx watch
```

Server script:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

Start Server only:

```powershell
npm run start:server
```

Or start everything:

```powershell
npm start
```

When backend source code changes:

```text
Source Code
     ↓
tsx watch detects change
     ↓
Node.js server restarts
```

No manual build is required during development.

---

# 13. Important Development Rule

During normal development:

```powershell
npm start
```

is enough.

You do **not** need to run:

```powershell
npm run build
```

after every change.

You also do **not** need to stop and restart the application after backend changes.

The development environment uses:

```text
React
 ↓
Vite HMR

Node.js
 ↓
tsx watch
```

---

# 14. Backend Startup Flow

The backend startup process is:

```text
server.ts
   ↓
Load environment variables
   ↓
Connect to MongoDB
   ↓
Start Express
   ↓
Listen on port 5000
```

The server connects to MongoDB before starting Express.

Therefore:

```text
MongoDB connection
       ↓
Successful
       ↓
Express starts
```

---

# 15. Express Application

The Express application is defined in:

```text
server/src/app.ts
```

The application includes:

* CORS
* JSON body parsing
* Health endpoint
* User routes

Example:

```typescript
app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.use("/api/users", userRoutes);
```

---

# 16. Health Check

Backend health endpoint:

```http
GET /health
```

URL:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

This confirms that Express is running.

---

# 17. Testing the Backend

## Browser

Open:

```text
http://localhost:5000/health
```

Expected:

```json
{
  "status": "ok"
}
```

## PowerShell

Run:

```powershell
Invoke-RestMethod http://localhost:5000/health
```

Expected:

```text
status
------
ok
```

---

# 18. User API

User routes are mounted under:

```text
/api/users
```

Base URL:

```text
http://localhost:5000/api/users
```

Example:

```http
GET http://localhost:5000/api/users
```

The complete CRUD API is implemented through the User routes, controllers, services, repositories, and Mongoose models.

---

# 19. Build

Build the complete application:

```powershell
npm run build
```

The build process is:

```text
Server
  ↓
TypeScript Compiler
  ↓
dist/

Client
  ↓
TypeScript Compiler
  ↓
Vite Build
  ↓
dist/
```

The build command is intended for:

* Production preparation
* Deployment
* CI/CD
* Docker image creation

It is **not required for normal development**.

---

# 20. Production Start

After creating a build:

```powershell
npm run start:prod
```

This runs the built Server and Client preview.

The current implementation is intended primarily for local verification of the production build.

For the final Dockerized production architecture, React will be served through Nginx.

---

# 21. Development vs Production

## Development

```text
npm start
```

Uses:

```text
React
  ↓
Vite

Node.js
  ↓
tsx watch
```

Features:

* Hot Module Replacement
* Automatic backend restart
* No manual build
* Fast development cycle

---

## Build

```text
npm run build
```

Creates production build artifacts.

---

## Production Verification

```text
npm run start:prod
```

Runs the generated build.

---

# 22. Troubleshooting

## Client does not start

Run:

```powershell
npm run start:client
```

Expected:

```text
Local: http://localhost:3200/
```

---

## Server does not start

Run:

```powershell
npm run start:server
```

Expected:

```text
MongoDB connected.
Server running on http://localhost:5000
```

---

## MongoDB connection problem

Check the MongoDB service:

```powershell
Get-Service MongoDB
```

Expected:

```text
Status
------
Running
```

Check MongoDB port:

```powershell
Test-NetConnection localhost -Port 27017
```

Expected:

```text
TcpTestSucceeded : True
```

---

## Port 5000 is already in use

Check:

```powershell
Get-NetTCPConnection -LocalPort 5000
```

Stop the conflicting process or change:

```env
PORT=5000
```

to another available port.

---

## Port 3200 is already in use

Check:

```powershell
Get-NetTCPConnection -LocalPort 3200
```

The Vite port can be changed in:

```text
client/package.json
```

---

# 23. Recommended Development Workflow

```text
1. Start MongoDB
        ↓
2. Open project root
        ↓
3. Run npm start
        ↓
4. Develop React
        ↓
5. Develop Node.js / Express
        ↓
6. Test APIs
        ↓
7. Test frontend
        ↓
8. Fix issues
        ↓
9. Run npm run build
        ↓
10. Prepare for deployment
```

During steps 3–8:

```text
No manual build
No manual server restart
```

---

# 24. Backend Architecture

The preferred backend architecture is:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository / Model
  ↓
MongoDB
```

Business logic should not be placed directly inside Express routes.

The goal is to keep the backend:

* Maintainable
* Testable
* Scalable
* Easy to understand
* Easy to Dockerize

---

# 25. Dockerization Stage

Docker is intentionally not required during the first development stage.

The application should first work correctly without Docker.

Later, the architecture will become:

```text
Browser
   ↓
React / Nginx Container
   ↓
Node.js / Express Container
   ↓
MongoDB Container
```

Docker Compose will manage:

```text
Frontend
Backend
MongoDB
Network
Volume
Environment Variables
Health Checks
```

MongoDB will use a named Docker volume for persistent data.

---

# 26. Docker Networking

Local development:

```text
mongodb://localhost:27017/full_stack_app
```

Docker:

```text
mongodb://mongodb:27017/full_stack_app
```

Inside Docker, containers must not use:

```text
localhost
```

to communicate with another container.

Docker Compose service names are used instead:

```text
backend
   ↓
mongodb:27017
```

This distinction will be covered during the Dockerization stage.

---

# 27. Final Command Reference

### Complete development environment

```powershell
npm start
```

### Client only

```powershell
npm run start:client
```

### Server only

```powershell
npm run start:server
```

### Build everything

```powershell
npm run build
```

### Run production build

```powershell
npm run start:prod
```

### Client direct command

```powershell
npm --prefix ./client run start
```

### Server direct command

```powershell
npm --prefix ./server run dev
```

---

# 28. Core Principle

> **First make the application work. Then make it portable.**

Application architecture:

```text
React
+
Node.js
+
MongoDB
```

Container architecture will be introduced later:

```text
React Container
+
Node.js Container
+
MongoDB Container
+
Docker Network
+
Docker Volume
+
Docker Compose
```

Docker is the runtime and deployment environment.

It is not the application architecture.
