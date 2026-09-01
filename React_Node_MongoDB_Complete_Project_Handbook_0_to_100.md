# React + Node.js + Express + MongoDB + Docker
# Complete Project Handbook — 0 to 100

> **Project Goal:** Build a professional full-stack portfolio application from zero, make it fully functional without Docker, then progressively containerize it with Docker and Docker Compose.

---

# Table of Contents

1. Project Vision
2. Learning Objectives
3. Technology Stack
4. Application Architecture
5. Runtime Architecture
6. Container Architecture
7. Development Roadmap 0–100
8. Prerequisites
9. Repository Creation
10. Frontend Creation
11. Frontend Architecture
12. Backend Creation
13. Backend Architecture
14. MongoDB Local Setup
15. Mongoose
16. Environment Configuration
17. REST API Design
18. User CRUD
19. Role CRUD
20. Setting CRUD
21. Authentication
22. Password Hashing
23. JWT
24. Authorization Middleware
25. HTTP Status Codes
26. Error Handling
27. Frontend API Layer
28. React Hooks
29. Protected Routes
30. Login / Logout Flow
31. Frontend States
32. Local Development
33. Testing the Local Application
34. Preparing for Docker
35. Docker Fundamentals
36. Backend Dockerfile
37. Frontend Dockerfile
38. Nginx
39. MongoDB Docker Image
40. Docker Network
41. Docker DNS and localhost
42. Docker Volume
43. Docker Compose
44. Mongo Express
45. Environment Variables in Docker
46. Container Startup Order
47. Health Checks
48. Docker Commands
49. Troubleshooting
50. Security Checklist
51. Performance Checklist
52. Git / GitHub
53. README Structure
54. Final Project Structure
55. Final Architecture
56. Verification Checklist
57. Learning Roadmap
58. Future Improvements
59. Final Mental Model

---

# 1. Project Vision

This project is designed as a realistic professional Full-Stack application.

The project is intentionally developed in two major stages.

## Stage 1 — Local Application

```text
Browser
   ↓
React + Vite
   ↓
Node.js + Express
   ↓
MongoDB
```

At this stage:

- React runs directly on the host.
- Node.js runs directly on the host.
- MongoDB runs locally.
- Docker is not required.

The objective is to understand and complete the application itself.

## Stage 2 — Containerized Application

After the local application is stable:

```text
Browser
   ↓
React + Nginx Container
   ↓
Node.js + Express Container
   ↓
MongoDB Container
   ↓
Named Volume
```

Docker changes the runtime environment, not the business architecture.

> **Golden Rule**
>
> First make the application work.
> Then make it portable.

---

# 2. Learning Objectives

By completing this project, you should understand:

## Frontend

- React
- Vite
- Components
- Pages
- Hooks
- Services
- Routing
- Protected Routes
- API communication
- Loading states
- Error states
- Empty states
- Form handling

## Backend

- Node.js
- Express
- TypeScript
- REST API
- Middleware
- Controllers
- Services
- Repositories
- Mongoose
- Validation
- Error handling

## Authentication

- Password hashing
- Login
- Signup
- JWT
- Bearer Token
- Authentication middleware
- 401 Unauthorized
- Logout

## Database

- MongoDB
- Collections
- Documents
- Mongoose schemas
- Models
- Queries
- CRUD

## DevOps

- Docker images
- Containers
- Dockerfiles
- Multi-stage builds
- Nginx
- Docker networks
- Docker DNS
- Volumes
- Docker Compose
- Environment variables
- Health checks

---

# 3. Technology Stack

## Frontend

```text
React
Vite
TypeScript / JavaScript
Fetch API
React Hooks
```

The frontend currently uses Vite and is developed around port:

```text
3200
```

## Backend

```text
Node.js
Express.js
TypeScript
Mongoose
dotenv
JWT
bcrypt
```

Backend:

```text
5000
```

## Database

```text
MongoDB 8.x
```

Local MongoDB:

```text
27017
```

## Docker

```text
Docker
Docker Compose
Nginx
```

Current containerized frontend:

```text
Host 8080 → Container 80
```

Mongo Express:

```text
Host 8081
```

---

# 4. Application Architecture

The application architecture is:

```text
                 Browser
                    │
                    ▼
              React Frontend
                    │
                 HTTP/REST
                    │
                    ▼
           Node.js + Express
                    │
                 Mongoose
                    │
                    ▼
                MongoDB
```

The important point is that this architecture exists independently of Docker.

---

# 5. Runtime Architecture

Without Docker:

```text
Windows Host
│
├── React / Vite
│     └── localhost:3200
│
├── Node.js
│     └── localhost:5000
│
└── MongoDB
      └── localhost:27017
```

All processes run on the host machine.

---

# 6. Container Architecture

With Docker:

```text
Docker Environment
│
├── frontend
│     └── Nginx :80
│
├── backend
│     └── Node.js :5000
│
├── mongodb
│     └── MongoDB :27017
│
├── mongo-express
│     └── Web UI :8081
│
├── Docker Network
│
└── Named Volume
      └── MongoDB Data
```

External access:

```text
localhost:8080 → frontend
localhost:5000 → backend
localhost:27017 → mongodb
localhost:8081 → mongo-express
```

Internal container communication:

```text
frontend
   ↓
backend:5000
   ↓
mongodb:27017
```

---

# 7. Development Roadmap 0–100

```text
00–05   Requirements
05–10   Architecture
10–20   React
20–30   Node + Express
30–40   MongoDB + Mongoose
40–55   CRUD APIs
55–70   Authentication
70–80   React/API Integration
80–85   Local Testing
85–90   Docker
90–95   Docker Compose
95–98   Persistence + Networking
98–100  Documentation + GitHub
```

Detailed sequence:

```text
1. Requirements
2. Architecture
3. Repository
4. React
5. Backend
6. MongoDB
7. Models
8. CRUD
9. Authentication
10. JWT Middleware
11. React API Services
12. Hooks
13. Protected Routes
14. Local Testing
15. Docker Backend
16. Docker Frontend
17. Docker MongoDB
18. Network
19. Volume
20. Compose
21. Health Checks
22. Final Testing
23. Documentation
24. GitHub
```

---

# 8. Prerequisites

Install:

```text
Node.js
npm
MongoDB
mongosh
Git
Docker Desktop
```

Verify:

```bash
node --version
npm --version
git --version
docker --version
docker compose version
mongosh --version
```

---

# 9. Repository Creation

Create the root project:

```text
NodeJs/
```

Inside:

```text
client/
server/
```

Recommended root structure:

```text
NodeJs/
├── client/
├── server/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── .dockerignore
```

---

# 10. Frontend Creation

Create React application using Vite.

Conceptually:

```bash
npm create vite@latest client
```

Select:

```text
React
```

Then:

```bash
cd client
npm install
npm run dev
```

Expected:

```text
http://localhost:3200
```

The exact Vite port is controlled by project configuration.

---

# 11. Frontend Architecture

Recommended:

```text
client/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── hooks/
    ├── models/
    ├── routing/
    ├── utilities/
    ├── App.*
    └── main.*
```

## Components

Reusable UI:

```text
AppCard
AppContainer
AppContent
AppTitle
DataGrid
```

## Pages

Application screens:

```text
Login
Users
Roles
Settings
```

## Services

API communication:

```text
BaseApiService
EntityService
UserService
AuthService
```

## Hooks

Reusable React logic:

```text
useUsers
```

## Models

Frontend data structures:

```text
User
Role
Setting
Auth
```

---

# 12. Backend Creation

Create server:

```bash
mkdir server
cd server
npm init -y
```

Install runtime dependencies:

```bash
npm install express mongoose cors dotenv jsonwebtoken bcrypt
```

Development dependencies:

```bash
npm install -D typescript tsx @types/node
```

Current project uses TypeScript and a development script similar to:

```json
"dev": "tsx watch src/server.ts"
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

---

# 13. Backend Architecture

Recommended architecture:

```text
server/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── repositories/
    ├── routes/
    ├── services/
    ├── utilities/
    ├── app.ts
    ├── database.ts
    └── server.ts
```

Request flow:

```text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Controller
     ↓
Service
     ↓
Repository / Model
     ↓
MongoDB
```

---

# 14. MongoDB Local Setup

During local development, MongoDB is accessed using:

```text
mongodb://localhost:27017/<database>
```

Why?

Because both Node.js and MongoDB are running on the host.

Example:

```text
Node.js
localhost:5000

MongoDB
localhost:27017
```

The backend can therefore use:

```text
localhost
```

Verify MongoDB:

```powershell
Test-NetConnection localhost -Port 27017
```

Or:

```bash
mongosh
```

---

# 15. Mongoose

Mongoose provides a structured programming layer over MongoDB.

Architecture:

```text
Node.js
   ↓
Mongoose
   ↓
MongoDB
```

Example conceptual User schema:

```text
User
├── key
├── firstName
├── lastName
├── email
├── passwordHash
├── createdAt
└── updatedAt
```

Mongoose handles:

- Schema definition
- Validation
- Queries
- Models
- Middleware
- Database operations

---

# 16. Environment Configuration

Never hardcode:

```text
Database passwords
JWT secrets
Production credentials
Environment-specific configuration
```

Use:

```text
.env
.env.example
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/app
JWT_SECRET=change-me
JWT_EXPIRES_IN=1h
```

`.env`:

```text
Private
```

`.env.example`:

```text
Public template
```

`.gitignore` should include:

```text
.env
```

---

# 17. REST API Design

REST resources should use predictable URLs.

Example:

```text
GET     /api/users
GET     /api/users/:key
POST    /api/users
PUT     /api/users/:key
DELETE  /api/users/:key
```

Authentication:

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

Health:

```text
GET /health
```

---

# 18. User CRUD

CRUD means:

```text
Create
Read
Update
Delete
```

## Create

```http
POST /api/users
```

## Read

```http
GET /api/users
```

## Read One

```http
GET /api/users/:key
```

## Update

```http
PUT /api/users/:key
```

## Delete

```http
DELETE /api/users/:key
```

Architecture:

```text
User Route
   ↓
User Controller
   ↓
User Service
   ↓
User Repository
   ↓
User Model
   ↓
MongoDB
```

---

# 19. Role CRUD

Use the same architectural pattern:

```text
Role Route
   ↓
Role Controller
   ↓
Role Service
   ↓
Role Repository
   ↓
Role Model
   ↓
MongoDB
```

Endpoints can follow:

```text
GET    /api/roles
POST   /api/roles
PUT    /api/roles/:key
DELETE /api/roles/:key
```

Do not place business logic directly inside routes.

---

# 20. Setting CRUD

Same architecture:

```text
Setting Route
   ↓
Setting Controller
   ↓
Setting Service
   ↓
Setting Repository
   ↓
Setting Model
   ↓
MongoDB
```

This consistency is important for maintainability.

---

# 21. Authentication

Authentication answers:

> Who is this user?

Authorization answers:

> Is this user allowed to perform this operation?

Login flow:

```text
Login Form
    ↓
POST /api/auth/login
    ↓
Auth Controller
    ↓
Auth Service
    ↓
Auth Repository
    ↓
MongoDB
    ↓
Password Verification
    ↓
JWT
    ↓
React
```

---

# 22. Password Hashing

Passwords must never be stored as plain text.

Bad:

```text
password: "123456"
```

Good:

```text
passwordHash: "<hashed-value>"
```

The flow is:

```text
Plain Password
      ↓
bcrypt
      ↓
Password Hash
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt compare
      ↓
Stored Hash
      ↓
Match / Reject
```

---

# 23. JWT

After successful authentication, the server generates an access token.

Conceptually:

```text
User Login
   ↓
Credentials Valid
   ↓
JWT Created
   ↓
Client Stores Token
```

The client sends:

```http
Authorization: Bearer <access-token>
```

JWT utility should obtain its secret from:

```text
process.env.JWT_SECRET
```

Never hardcode the secret.

---

# 24. Authorization Middleware

Protected request:

```text
HTTP Request
     ↓
Authorization Header
     ↓
Bearer Token
     ↓
JWT Verification
     ↓
User Identity
     ↓
Controller
```

The middleware can set:

```text
req.user.userKey
```

If the token is missing or invalid:

```text
401 Unauthorized
```

---

# 25. HTTP Status Codes

Important status codes:

## 200 OK

Request succeeded.

## 201 Created

New resource created.

## 204 No Content

Successful operation with no response body.

## 400 Bad Request

Client sent invalid request data.

## 401 Unauthorized

Authentication failed or token is invalid.

## 403 Forbidden

User is authenticated but does not have permission.

## 404 Not Found

Resource does not exist.

## 409 Conflict

Resource conflicts with existing data.

## 500 Internal Server Error

Unexpected server failure.

---

# 26. Error Handling

Do not expose internal errors to users.

Architecture:

```text
Controller
   ↓
Service
   ↓
Error
   ↓
Central Error Middleware
   ↓
HTTP Response
```

Client should interpret status codes.

For example:

```text
400 → validation/business input problem
401 → authentication problem
403 → authorization problem
404 → resource not found
500 → server problem
```

---

# 27. Frontend API Layer

API communication should not be scattered throughout components.

Recommended:

```text
Component
   ↓
Hook
   ↓
Service
   ↓
BaseApiService
   ↓
Fetch
```

Example:

```text
UsersPage
   ↓
useUsers()
   ↓
userService.getAll()
   ↓
BaseApiService.get()
   ↓
GET /api/users
```

This separates UI from networking.

---

# 28. BaseApiService

Responsibilities:

- HTTP requests
- Authorization header
- Response parsing
- Error handling
- Token handling
- Status code processing

Bearer Token:

```http
Authorization: Bearer <token>
```

A centralized API service prevents duplicated fetch logic.

---

# 29. React Hooks

Example:

```text
useUsers
```

Responsibilities:

```text
Fetch users
Store users
Loading state
Error state
Refresh
```

Conceptual flow:

```text
UsersPage
   ↓
useUsers
   ↓
userService
   ↓
Backend
```

Hooks should contain reusable UI/application logic rather than low-level UI markup.

---

# 30. Protected Routes

Authentication state determines whether the user can access protected pages.

Conceptual:

```text
Request Protected Page
        ↓
Is Authenticated?
   ┌────┴────┐
  Yes       No
   ↓         ↓
Page       Login
```

The application should prevent unauthorized navigation.

---

# 31. Login / Logout Flow

## Login

```text
Login Form
   ↓
AuthService.login()
   ↓
POST /api/auth/login
   ↓
JWT
   ↓
Store Access Token
   ↓
Authenticated
   ↓
Navigate to Application
```

## Logout

Client-side:

```text
Remove access token
Clear authentication state
Navigate to Login
```

Server-side logout can be implemented according to the selected token strategy.

Important distinction:

With stateless JWT access tokens, deleting the token on the client prevents future use from that browser, but an already-issued token may remain cryptographically valid until expiration unless a server-side revocation strategy is used.

---

# 32. Frontend States

Every API-driven page should handle:

```text
Loading
Success
Empty
Error
```

Example:

```text
Loading
  ↓
Request
  ↓
┌───────────────┐
│ Success       │
│ Empty         │
│ Error         │
└───────────────┘
```

Do not leave users with a blank page when an API fails.

---

# 33. Local Development

Before Docker, run the entire application locally.

## MongoDB

```text
localhost:27017
```

## Backend

```bash
cd server
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health:

```text
http://localhost:5000/health
```

## Frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:3200
```

---

# 34. Testing the Local Application

Before Dockerization, verify:

## Backend

- [ ] Starts successfully
- [ ] MongoDB connects
- [ ] `/health` works
- [ ] API routes work

## Database

- [ ] MongoDB is running
- [ ] Collections are created
- [ ] CRUD works

## Authentication

- [ ] Signup
- [ ] Login
- [ ] Password verification
- [ ] JWT generation
- [ ] Bearer token
- [ ] Protected endpoint
- [ ] Invalid token returns 401
- [ ] Logout

## Frontend

- [ ] Login
- [ ] Navigation
- [ ] Users CRUD
- [ ] Roles CRUD
- [ ] Settings CRUD
- [ ] Error handling
- [ ] Loading states

Only after this stage is stable should Dockerization continue.

---

# 35. Preparing for Docker

Before Docker:

```text
Application must already work.
```

Docker should not be used to hide application problems.

Check:

```text
React works
Backend works
MongoDB works
API works
Authentication works
CRUD works
```

Then containerize.

---

# 36. Docker Fundamentals

## Image

A reusable package containing:

```text
Application
Dependencies
Runtime
Configuration instructions
```

## Container

A running instance of an image.

```text
Image
  ↓
Container
```

## Dockerfile

Instructions used to build an image.

## Docker Compose

Defines and orchestrates multiple services.

---

# 37. Backend Dockerfile

The backend uses Node.js.

Current project approach:

```dockerfile
FROM node:22-alpine
```

Build image:

```bash
docker build -t react-node-backend ./server
```

Run:

```bash
docker run -p 5000:5000 react-node-backend
```

Port mapping:

```text
Host:5000
   ↓
Container:5000
```

---

# 38. Frontend Dockerfile

Production frontend should not use the Vite development server.

Preferred architecture:

```text
React Source
     ↓
Node Build
     ↓
Static Files
     ↓
Nginx
```

Multi-stage build:

```text
Stage 1
Node
Build React

Stage 2
Nginx
Serve static files
```

Current Nginx image:

```text
nginx:1.29-alpine
```

Container:

```text
80
```

Host:

```text
8080
```

Therefore:

```text
http://localhost:8080
```

---

# 39. Nginx

Nginx serves the compiled React application.

Production flow:

```text
Browser
   ↓
Nginx
   ↓
React Static Files
```

Benefits:

- Lightweight runtime
- Production-oriented serving
- No Vite dev server required
- Static file performance

---

# 40. MongoDB Docker Image

Use official MongoDB image:

```text
mongo:8.0
```

Conceptual:

```text
mongodb:
  image: mongo:8.0
```

MongoDB container:

```text
27017
```

The database should use a named volume.

---

# 41. Docker Network

Create a Docker network for application services.

Conceptually:

```text
                 app-network
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    frontend      backend      mongodb
```

Containers on the same network can communicate using service names.

---

# 42. Docker DNS and localhost

This is one of the most important Docker concepts.

## Local

Node.js is on the host:

```text
mongodb://localhost:27017/app
```

## Docker

Node.js is inside a container.

MongoDB is inside another container.

Therefore:

```text
mongodb://mongodb:27017/app
```

Why not localhost?

Inside the backend container:

```text
localhost
```

means:

```text
backend container itself
```

It does not mean:

```text
MongoDB container
```

Docker Compose service name:

```text
mongodb
```

is resolved by Docker DNS.

Therefore:

```text
backend → mongodb
```

works.

---

# 43. Docker Volume

Containers are disposable.

Database data should not be.

Architecture:

```text
MongoDB Container
       ↓
Named Volume
       ↓
Persistent Data
```

Example conceptual volume:

```text
mongodb-data
```

The volume survives normal container recreation.

Important:

```bash
docker compose down
```

does not normally remove named volumes.

But:

```bash
docker compose down -v
```

removes the volumes defined by Compose.

Therefore:

> `down -v` can delete your MongoDB persistent data.

Use it carefully.

---

# 44. Docker Compose

The final Compose system contains at least:

```text
frontend
backend
mongodb
```

The project also uses:

```text
mongo-express
```

for browser-based MongoDB administration.

Conceptual:

```text
services:
  mongodb
  backend
  frontend
  mongo-express
```

Compose also defines:

```text
networks
volumes
environment
ports
healthchecks
```

---

# 45. Mongo Express

Mongo Express provides a web interface for MongoDB.

Architecture:

```text
Browser
   ↓
localhost:8081
   ↓
Mongo Express
   ↓
mongodb:27017
```

It is useful during development for:

- Viewing databases
- Viewing collections
- Viewing documents
- Basic database administration

It should be secured appropriately and should not be unnecessarily exposed in production.

---

# 46. Environment Variables in Docker

Local:

```text
MONGODB_URI=mongodb://localhost:27017/app
```

Docker:

```text
MONGODB_URI=mongodb://mongodb:27017/app
```

Same application.

Different runtime environment.

This demonstrates why configuration must be externalized.

---

# 47. Container Startup Order

A common misconception:

```text
depends_on
```

does not automatically mean:

> MongoDB is fully ready to accept connections.

There is a difference between:

```text
Container Started
```

and:

```text
Service Ready
```

Health checks can improve startup coordination.

Conceptual:

```text
MongoDB
   ↓
Health Check
   ↓
Healthy
   ↓
Backend connects
```

The backend should also be resilient and able to retry or fail clearly when the database is temporarily unavailable.

---

# 48. Health Checks

The backend already provides:

```text
GET /health
```

This endpoint can verify that the application process is alive.

A stronger production health strategy may distinguish:

```text
Liveness
```

from:

```text
Readiness
```

For example:

```text
/health
/ready
```

A readiness check can verify dependencies such as MongoDB.

---

# 49. Important Docker Commands

## Build

```bash
docker build -t react-node-backend ./server
```

```bash
docker build -t react-frontend ./client
```

## Run

```bash
docker run -p 5000:5000 react-node-backend
```

## Containers

```bash
docker ps
```

```bash
docker ps -a
```

## Images

```bash
docker images
```

## Compose

```bash
docker compose up -d
```

```bash
docker compose down
```

```bash
docker compose down -v
```

```bash
docker compose ps
```

## Logs

```bash
docker compose logs
```

```bash
docker compose logs backend
```

```bash
docker compose logs frontend
```

```bash
docker compose logs mongodb
```

Follow logs:

```bash
docker compose logs -f backend
```

## Network

```bash
docker network ls
```

```bash
docker network inspect app-network
```

## Volume

```bash
docker volume ls
```

```bash
docker volume inspect <volume-name>
```

## Inspect container

```bash
docker inspect mongodb
```

---

# 50. Troubleshooting

Use this process:

```text
Error
 ↓
Read exact message
 ↓
Identify root cause
 ↓
Check service status
 ↓
Check logs
 ↓
Check ports
 ↓
Check network
 ↓
Check environment
 ↓
Check database
 ↓
Apply minimal fix
 ↓
Retest
```

Do not randomly modify multiple files.

---

# 51. Port Already in Use

Example:

```text
port is already allocated
```

Windows:

```powershell
netstat -ano | findstr :8080
```

For backend:

```powershell
netstat -ano | findstr :5000
```

For MongoDB:

```powershell
netstat -ano | findstr :27017
```

Docker:

```bash
docker ps
```

Then determine which application/container owns the port.

---

# 52. Backend Cannot Connect to MongoDB

Check the environment.

Local:

```text
mongodb://localhost:27017/app
```

Docker:

```text
mongodb://mongodb:27017/app
```

Never use:

```text
mongodb://localhost:27017/app
```

inside the backend container when MongoDB is another container.

Also verify:

```bash
docker compose ps
```

and:

```bash
docker compose logs mongodb
```

---

# 53. Frontend Cannot Reach Backend

Check:

```text
Browser
   ↓
Frontend
   ↓
API URL
   ↓
Backend
```

Verify backend:

```text
http://localhost:5000/health
```

Check browser Network tab.

Check:

- API URL
- Port
- CORS
- Container mapping
- Nginx configuration
- Environment variables

---

# 54. 401 Login / API Errors

Check:

```text
Authorization header
```

Expected:

```http
Authorization: Bearer <token>
```

Then check:

```text
Token exists?
Token valid?
Token expired?
JWT secret correct?
Middleware registered?
```

If token is invalid:

```text
401 Unauthorized
```

Client should clear authentication state and navigate to login when appropriate.

---

# 55. Docker Network Troubleshooting

List networks:

```bash
docker network ls
```

Inspect:

```bash
docker network inspect app-network
```

Verify that required containers belong to the network.

Example:

```text
backend
mongodb
```

must share a network if backend connects to MongoDB using:

```text
mongodb
```

---

# 56. Security Checklist

Never commit:

```text
.env
JWT secrets
Database passwords
Private keys
Production credentials
```

Use:

```text
.env.example
```

Also:

- Validate request data
- Hash passwords
- Use secure JWT secrets
- Avoid leaking stack traces
- Configure CORS carefully
- Limit production exposure of MongoDB
- Protect Mongo Express
- Use HTTPS in production
- Keep dependencies updated
- Use non-root containers where appropriate

---

# 57. Performance Checklist

## Frontend

- Production React build
- Nginx static serving
- Avoid unnecessary re-renders
- Reusable components
- Efficient API requests

## Backend

- Proper database indexes
- Pagination for large collections
- Validation
- Avoid unnecessary database queries
- Centralized error handling

## MongoDB

- Index important fields
- Avoid unbounded queries
- Use projections where useful
- Monitor slow queries

## Docker

- Small base images
- Multi-stage builds
- `.dockerignore`
- Avoid unnecessary files in images

---

# 58. Git / GitHub

Recommended initial:

```bash
git init
```

Check:

```bash
git status
```

Commit:

```bash
git add .
git commit -m "Initial full-stack application"
```

Later commits should represent meaningful milestones.

Examples:

```text
feat: add user CRUD API
feat: add JWT authentication
feat: add protected routes
feat: dockerize backend
feat: dockerize frontend
feat: add mongodb compose service
feat: add persistent mongodb volume
docs: update docker documentation
```

---

# 59. README Structure

The final README should include:

```text
Project Overview
Features
Technology Stack
Architecture
Project Structure
Prerequisites
Local Development
Environment Variables
API Documentation
Authentication
MongoDB
Docker
Docker Compose
Networking
Volumes
Troubleshooting
Testing
Future Improvements
```

Architecture diagram:

```text
Browser
   ↓
React
   ↓
Express API
   ↓
MongoDB
```

Docker diagram:

```text
Browser
   ↓
Frontend Container
   ↓
Backend Container
   ↓
MongoDB Container
   ↓
Named Volume
```

---

# 60. Final Project Structure

Recommended final repository:

```text
NodeJs/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── routing/
│   │   ├── services/
│   │   └── utilities/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utilities/
│   │   ├── app.ts
│   │   ├── database.ts
│   │   └── server.ts
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ...
│
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

---

# 61. Final Architecture

## Application

```text
                 Browser
                    │
                    ▼
             React Application
                    │
                 REST/HTTP
                    │
                    ▼
            Express API Server
                    │
                Mongoose
                    │
                    ▼
                 MongoDB
```

## Backend Internal Architecture

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository / Model
  ↓
MongoDB
```

## Frontend Internal Architecture

```text
Page
  ↓
Hook
  ↓
Service
  ↓
BaseApiService
  ↓
HTTP API
```

---

# 62. Final Docker Architecture

```text
                         Browser
                            │
                            ▼
                   localhost:8080
                            │
                            ▼
                 ┌──────────────────┐
                 │ Frontend          │
                 │ Nginx             │
                 │ Container :80     │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Backend           │
                 │ Node + Express    │
                 │ Container :5000   │
                 └────────┬─────────┘
                          │
                     mongodb:27017
                          │
                          ▼
                 ┌──────────────────┐
                 │ MongoDB           │
                 │ Container :27017  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Named Volume      │
                 │ Persistent Data   │
                 └──────────────────┘
```

All services communicate through Docker networking.

---

# 63. Verification Checklist

## Application

- [ ] React works
- [ ] Backend works
- [ ] MongoDB works
- [ ] Health endpoint works
- [ ] User CRUD works
- [ ] Role CRUD works
- [ ] Setting CRUD works
- [ ] Signup works
- [ ] Login works
- [ ] JWT is generated
- [ ] Bearer Token is sent
- [ ] Protected APIs work
- [ ] Invalid token returns 401
- [ ] Logout works
- [ ] Loading state works
- [ ] Error state works
- [ ] Empty state works

## Docker

- [ ] Backend image builds
- [ ] Frontend image builds
- [ ] Nginx serves React
- [ ] MongoDB container starts
- [ ] Backend connects to MongoDB
- [ ] Containers share network
- [ ] MongoDB uses named volume
- [ ] Data survives container recreation
- [ ] Compose starts all services
- [ ] Health checks work
- [ ] Environment variables work
- [ ] Logs are understandable

## GitHub

- [ ] README
- [ ] .gitignore
- [ ] .dockerignore
- [ ] .env.example
- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] Architecture documentation
- [ ] Setup instructions
- [ ] Troubleshooting
- [ ] Meaningful commits

---

# 64. Learning Roadmap

The recommended learning sequence is:

```text
JavaScript / TypeScript
        ↓
React
        ↓
HTTP
        ↓
REST
        ↓
Node.js
        ↓
Express
        ↓
MongoDB
        ↓
Mongoose
        ↓
CRUD
        ↓
Authentication
        ↓
JWT
        ↓
Middleware
        ↓
Docker
        ↓
Dockerfile
        ↓
Images
        ↓
Containers
        ↓
Networks
        ↓
DNS
        ↓
Volumes
        ↓
Docker Compose
        ↓
Nginx
        ↓
Production Architecture
```

---

# 65. Future Improvements

After completing the current version, possible improvements include:

## Authentication

```text
Refresh Tokens
Token Rotation
Token Revocation
Role-Based Authorization
Permission-Based Authorization
```

## Backend

```text
Request Validation
Rate Limiting
Structured Logging
API Versioning
OpenAPI / Swagger
Automated Tests
Integration Tests
```

## Frontend

```text
Better Form Validation
Global Authentication State
Caching
Pagination
Search
Filtering
Reusable Modal System
```

## Docker

```text
Production Secrets
Non-root Containers
Resource Limits
Health Checks
Reverse Proxy
HTTPS
CI/CD
```

## Deployment

```text
Cloud VM
Container Registry
GitHub Actions
Reverse Proxy
TLS
Monitoring
Centralized Logging
```

---

# 66. Professional Architecture Principles

## Separation of Concerns

Each layer has one primary responsibility.

```text
Route       → Routing
Controller  → HTTP
Service     → Business Logic
Repository  → Data Access
Model       → Data Structure
```

## Configuration Separation

```text
Code
 ≠
Environment Configuration
```

## Application vs Infrastructure

Application:

```text
React
Node
MongoDB
```

Infrastructure:

```text
Docker
Compose
Network
Volume
Nginx
```

## Reusability

Avoid:

```text
Duplicate API logic
Duplicate UI logic
Duplicate error handling
```

Prefer reusable:

```text
Components
Hooks
Services
Utilities
Middleware
```

---

# 67. The Most Important Docker Concepts

## Host

Your physical/virtual operating system.

Example:

```text
Windows
```

## Container

An isolated process environment managed by Docker.

Example:

```text
backend container
```

## Image

Template used to create a container.

```text
node:22-alpine
```

## Port Mapping

```text
Host Port : Container Port
```

Example:

```text
8080:80
```

Means:

```text
localhost:8080
      ↓
container:80
```

## Network

Allows containers to communicate.

## Volume

Stores persistent data outside the disposable container filesystem.

---

# 68. Host vs Container Networking

This concept must be remembered:

### Host to Container

```text
localhost:8080
```

can access a port published by Docker.

### Container to Container

Use:

```text
service-name:port
```

Example:

```text
mongodb:27017
```

Do not use:

```text
localhost:27017
```

for MongoDB from the backend container.

---

# 69. Complete Execution Flow

When a user opens the application:

```text
Browser
   ↓
localhost:8080
   ↓
Nginx
   ↓
React
```

When React requests users:

```text
React
   ↓
GET /api/users
   ↓
Backend
   ↓
Authentication Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository / Mongoose
   ↓
mongodb:27017
   ↓
MongoDB
```

Response:

```text
MongoDB
   ↓
Mongoose
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
Express
   ↓
React
   ↓
Browser
```

---

# 70. Complete Authentication Flow

```text
User
 ↓
Login Form
 ↓
React AuthService
 ↓
POST /api/auth/login
 ↓
Express Route
 ↓
Auth Controller
 ↓
Auth Service
 ↓
Auth Repository
 ↓
MongoDB
 ↓
Password Verification
 ↓
JWT
 ↓
React
 ↓
Access Token
```

Future protected request:

```text
React
 ↓
Authorization: Bearer TOKEN
 ↓
Express
 ↓
Auth Middleware
 ↓
JWT Verification
 ↓
req.user
 ↓
Controller
 ↓
Service
 ↓
MongoDB
```

Invalid token:

```text
JWT Invalid
   ↓
401 Unauthorized
   ↓
Client clears authentication
   ↓
Navigate to Login
```

---

# 71. Complete Docker Compose Flow

Start:

```bash
docker compose up -d
```

Compose creates/starts:

```text
Network
Volume
MongoDB
Backend
Frontend
Mongo Express
```

Communication:

```text
Frontend
   ↓
Backend
   ↓
MongoDB
```

MongoDB data:

```text
MongoDB
   ↓
Named Volume
```

Stop:

```bash
docker compose down
```

Data remains in the named volume.

Remove volumes:

```bash
docker compose down -v
```

Data may be deleted.

---

# 72. Professional Development Sequence

Never skip directly to Docker.

Use:

```text
Requirements
    ↓
Architecture
    ↓
Frontend
    ↓
Backend
    ↓
Database
    ↓
API
    ↓
Authentication
    ↓
Frontend Integration
    ↓
Testing
    ↓
Docker
    ↓
Compose
    ↓
Production Improvements
```

This ensures Docker is an infrastructure layer rather than a dependency of the application architecture.

---

# 73. Final Project Definition

The final project demonstrates two separate skills.

## Full-Stack Development

```text
React
+
Node.js
+
Express
+
MongoDB
+
Mongoose
+
REST API
+
JWT Authentication
```

## Containerization / DevOps

```text
Docker
+
Dockerfile
+
Multi-stage Build
+
Nginx
+
Docker Network
+
Docker DNS
+
Named Volume
+
Docker Compose
+
Environment Variables
+
Health Checks
```

This combination makes the project suitable as a professional portfolio project.

---

# 74. Final Mental Model

Always think about the project at three levels.

## Level 1 — Application

```text
React
   ↓
Express
   ↓
MongoDB
```

## Level 2 — Runtime

```text
Frontend Process
   ↓
Backend Process
   ↓
MongoDB Process
```

## Level 3 — Infrastructure

```text
Frontend Container
+
Backend Container
+
MongoDB Container
+
Network
+
Volume
+
Compose
+
Nginx
```

The business logic remains at Level 1.

Docker mainly changes Level 2 and Level 3.

---

# 75. Final Golden Rule

> **First make the application work. Then make it portable.**

Do not memorize Docker commands without understanding the architecture.

You should be able to answer:

1. Why does React call the backend?
2. Why does the backend use Mongoose?
3. Why is MongoDB separated from the backend?
4. Why is business logic placed in Services?
5. Why do we use JWT?
6. Why is the token sent as Bearer?
7. Why does invalid authentication return 401?
8. Why does Docker use service names?
9. Why is `localhost` different inside a container?
10. Why does MongoDB need a Volume?
11. Why does `docker compose down -v` matter?
12. Why does React production use Nginx?
13. Why do we use Docker Compose?
14. Why should secrets be environment variables?
15. Why should Docker not dictate application architecture?

If you understand these questions, you understand the architecture rather than merely knowing how to run it.

---

# 76. Final Status Target

The final system should be able to start with:

```bash
docker compose up -d
```

And provide:

```text
Frontend
http://localhost:8080

Backend
http://localhost:5000

Health
http://localhost:5000/health

Mongo Express
http://localhost:8081

MongoDB
localhost:27017
```

Final architecture:

```text
                         Browser
                            │
                            ▼
                     React + Nginx
                       Container
                            │
                            ▼
                   Node + Express
                       Container
                            │
                            ▼
                       MongoDB
                       Container
                            │
                            ▼
                      Named Volume
```

---

# 77. Conclusion

This project is more than a React application or a Docker exercise.

It is a complete learning path for understanding:

```text
Frontend Development
        +
Backend Development
        +
Database Development
        +
Authentication
        +
API Architecture
        +
Containerization
        +
Networking
        +
Persistence
        +
Production Architecture
```

The correct order is:

```text
Build
 ↓
Understand
 ↓
Test
 ↓
Containerize
 ↓
Verify
 ↓
Document
 ↓
Deploy
```

The final objective is not simply:

> "The project runs in Docker."

The real objective is:

> **Understand why the application works without Docker, understand how Docker changes its runtime environment, and understand how to build a maintainable, secure, and portable full-stack system.**

---

# Appendix A — Quick Start

## Local

MongoDB must be running.

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Expected:

```text
Frontend → localhost:3200
Backend  → localhost:5000
MongoDB  → localhost:27017
```

## Docker

From root:

```bash
docker compose up -d
```

Check:

```bash
docker compose ps
```

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:5000
```

Health:

```text
http://localhost:5000/health
```

Mongo Express:

```text
http://localhost:8081
```

Stop:

```bash
docker compose down
```

Remove volumes:

```bash
docker compose down -v
```

---

# Appendix B — Essential Commands

```bash
# Node
node --version
npm --version

# Git
git status
git add .
git commit -m "message"

# Local backend
npm run dev
npm run build
npm start

# Docker
docker --version
docker compose version
docker ps
docker images

# Compose
docker compose up -d
docker compose down
docker compose down -v
docker compose ps
docker compose logs
docker compose logs -f backend

# Network
docker network ls
docker network inspect app-network

# Volume
docker volume ls

# Inspect
docker inspect mongodb

# Build
docker build -t react-node-backend ./server
docker build -t react-frontend ./client
```

---

# Appendix C — Project Checklist

```text
[ ] Requirements
[ ] Architecture
[ ] Repository
[ ] React
[ ] Backend
[ ] MongoDB
[ ] Mongoose
[ ] User CRUD
[ ] Role CRUD
[ ] Setting CRUD
[ ] Signup
[ ] Login
[ ] Password Hashing
[ ] JWT
[ ] Bearer Token
[ ] Auth Middleware
[ ] Protected Routes
[ ] Logout
[ ] Error Handling
[ ] Validation
[ ] Loading State
[ ] Empty State
[ ] Local Testing
[ ] Backend Dockerfile
[ ] Frontend Dockerfile
[ ] Multi-stage Build
[ ] Nginx
[ ] MongoDB Image
[ ] Docker Network
[ ] Docker DNS
[ ] Named Volume
[ ] Docker Compose
[ ] Mongo Express
[ ] Environment Variables
[ ] Health Checks
[ ] Persistence Test
[ ] Restart Test
[ ] Failure Test
[ ] Security Review
[ ] README
[ ] GitHub
```

---

**End of Project Handbook**
