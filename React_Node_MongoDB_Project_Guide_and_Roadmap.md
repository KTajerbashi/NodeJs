# React + Node.js + Express + MongoDB — Project Guide & Roadmap

## 1. هدف پروژه

این سند نقشه راه کامل پروژه Full-Stack است و دو مرحله اصلی را پوشش می‌دهد:

1. ساخت و تکمیل برنامه بدون Docker
2. Dockerize کردن برنامه پس از اطمینان از عملکرد صحیح نسخه Local

هدف فقط اجرای Docker نیست؛ هدف این است که معماری برنامه، ارتباط Frontend و Backend، MongoDB، احراز هویت، شبکه Docker، Volume و Docker Compose به‌صورت اصولی درک و پیاده‌سازی شوند.

> Golden Rule:
> **First make the application work. Then make it portable.**

---

# 2. معماری کلی

## Application Architecture

```text
Browser
   ↓
React + Vite
   ↓ HTTP / REST API
Node.js + Express
   ↓ Mongoose
MongoDB
```

## Container Architecture

```text
Browser
   ↓
Frontend Container
React Build + Nginx
   ↓
Backend Container
Node.js + Express
   ↓
MongoDB Container
   ↓
Named Volume
```

Docker فقط محیط اجرای برنامه را تغییر می‌دهد؛ معماری Business/Application نباید وابسته به Docker باشد.

---

# 3. تکنولوژی‌ها

### Frontend
- React
- Vite
- JavaScript / TypeScript
- Fetch API
- React Hooks
- Reusable Components
- Pages
- Services
- Protected Routes
- SweetAlert

### Backend
- Node.js
- Express.js
- TypeScript
- Mongoose
- REST API
- dotenv
- JWT
- bcrypt
- Middleware
- Centralized Error Handling

### Database
- MongoDB
- MongoDB 8.x
- Mongoose

### DevOps
- Docker
- Docker Compose
- Nginx
- Docker Network
- Docker Named Volume
- Health Checks

---

# 4. ساختار پیشنهادی Repository

```text
NodeJs/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── models/
│   │   ├── utilities/
│   │   ├── routing/
│   │   └── ...
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
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
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

> `.env` نباید Commit شود.

---

# 5. معماری Backend

الگوی اصلی:

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

## Route
مسیر HTTP را تعریف می‌کند.

مثلاً:

```text
GET /api/users
POST /api/users
PUT /api/users/:key
DELETE /api/users/:key
```

Route نباید Business Logic داشته باشد.

## Controller
Request را دریافت و Response را تولید می‌کند.

وظیفه Controller:
- دریافت input
- فراخوانی Service
- تعیین HTTP status
- ارسال response

## Service
Business Logic در Service قرار می‌گیرد.

مثلاً:
- بررسی وجود User
- Hash کردن Password
- Login
- تولید JWT
- قوانین مربوط به User

## Repository / Model
ارتباط با MongoDB و Mongoose.

---

# 6. راه‌اندازی Backend

داخل server:

```bash
npm install
```

اجرای Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

Backend روی:

```text
http://localhost:5000
```

Health Check:

```text
GET http://localhost:5000/health
```

نتیجه مورد انتظار:

```text
200 OK
```

---

# 7. اتصال MongoDB در Local

در مرحله بدون Docker:

```text
mongodb://localhost:27017/<database>
```

علت استفاده از `localhost` این است که Node.js روی Host اجرا می‌شود و MongoDB نیز روی Host قرار دارد.

بررسی MongoDB:

```bash
mongosh
```

یا:

```bash
Test-NetConnection localhost -Port 27017
```

---

# 8. Mongoose

Mongoose بین Node.js و MongoDB قرار می‌گیرد:

```text
Node.js
   ↓
Mongoose
   ↓
MongoDB
```

نمونه User Model:

```text
User
├── key
├── firstName
├── lastName
├── email
├── passwordHash
└── timestamps
```

`email` می‌تواند Unique و Lowercase باشد.

---

# 9. REST API

نمونه APIهای اصلی:

```text
GET     /health

POST    /api/auth/signup
POST    /api/auth/login
POST    /api/auth/logout

GET     /api/users
GET     /api/users/:key
POST    /api/users
PUT     /api/users/:key
DELETE  /api/users/:key
```

برای منابع دیگر مانند Role و Setting نیز همین الگوی REST رعایت می‌شود.

---

# 10. Authentication

جریان Login:

```text
React Login Form
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
JWT Access Token
      ↓
React
```

JWT شامل اطلاعات لازم برای شناسایی User است.

در درخواست‌های محافظت‌شده:

```http
Authorization: Bearer <access-token>
```

---

# 11. Authentication Middleware

Middleware ابتدا Header را بررسی می‌کند:

```text
Authorization
      ↓
Bearer Token
      ↓
JWT Verification
      ↓
req.user.userKey
      ↓
Controller
```

اگر Token معتبر نباشد:

```text
401 Unauthorized
```

تفاوت مهم:

```text
400 Bad Request
```

برای Request نامعتبر است.

```text
401 Unauthorized
```

برای Authentication نامعتبر یا Token نامعتبر/منقضی‌شده است.

---

# 12. Frontend Architecture

Frontend باید UI را از API جدا نگه دارد:

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

نمونه:

```text
UsersPage
   ↓
useUsers()
   ↓
userService
   ↓
BaseApiService
   ↓
GET /api/users
```

این ساختار باعث Reusable و قابل نگهداری شدن API Communication می‌شود.

---

# 13. BaseApiService

وظایف:

- ارسال HTTP Request
- اضافه کردن Authorization Header
- پردازش Response
- مدیریت Error
- مدیریت Status Code
- مدیریت Token

برای Token:

```http
Authorization: Bearer <token>
```

در صورت دریافت `401`، Session/Token باید مدیریت و کاربر به Login هدایت شود.

---

# 14. UI State Management

هر درخواست API باید حداقل این وضعیت‌ها را در نظر بگیرد:

```text
Loading
Success
Empty
Error
```

مثال:

```text
Loading → نمایش Loading
Success → نمایش Data
Empty → نمایش Empty State
Error → نمایش Error Message
```

---

# 15. مرحله Local Development

قبل از Docker این مراحل باید کامل باشند:

## Step 1 — Frontend

```bash
cd client
npm install
npm run dev
```

Frontend فعلی روی پورت:

```text
3200
```

اجرا می‌شود.

## Step 2 — Backend

```bash
cd server
npm install
npm run dev
```

Backend:

```text
5000
```

## Step 3 — MongoDB

MongoDB Local:

```text
27017
```

## Step 4 — تست

```text
Browser
 ↓
React :3200
 ↓
Node :5000
 ↓
MongoDB :27017
```

---

# 16. ترتیب کامل ساخت پروژه

```text
1. تعریف Requirements
        ↓
2. طراحی Architecture
        ↓
3. ایجاد React + Vite
        ↓
4. ایجاد Node.js + Express
        ↓
5. ایجاد MongoDB Connection
        ↓
6. ایجاد Mongoose Models
        ↓
7. ایجاد Routes
        ↓
8. ایجاد Controllers
        ↓
9. ایجاد Services
        ↓
10. ایجاد Repository
        ↓
11. ایجاد CRUD APIs
        ↓
12. ایجاد Authentication
        ↓
13. ایجاد JWT Middleware
        ↓
14. اتصال React به API
        ↓
15. ایجاد Hooks
        ↓
16. ایجاد Protected Routes
        ↓
17. مدیریت Loading/Error/Empty
        ↓
18. تست کامل Local
        ↓
19. Dockerize Backend
        ↓
20. Dockerize Frontend
        ↓
21. Dockerize MongoDB
        ↓
22. Docker Network
        ↓
23. MongoDB Volume
        ↓
24. Docker Compose
        ↓
25. Health Checks
        ↓
26. تست کامل Containerized System
        ↓
27. README و GitHub Cleanup
```

---

# 17. شروع Dockerization

Docker را فقط پس از موفقیت نسخه Local اضافه می‌کنیم.

هدف:

```text
React
 ↓
Node.js
 ↓
MongoDB
```

همگی داخل Docker.

---

# 18. Docker Backend

Backend از Image رسمی Node استفاده می‌کند.

نمونه پایه:

```dockerfile
FROM node:22-alpine
```

Build مراحل:

```text
Dockerfile
   ↓
Docker Image
   ↓
Container
```

Build:

```bash
docker build -t react-node-backend ./server
```

Run:

```bash
docker run -p 5000:5000 react-node-backend
```

---

# 19. Docker Frontend

برای Production بهتر است:

```text
React Source
   ↓
Node Build
   ↓
Static Files
   ↓
Nginx
```

Imageها:

```dockerfile
node:22-alpine
nginx:1.29-alpine
```

این ساختار Multi-Stage Build است.

هدف:

- Build با Node
- Serve با Nginx
- Image نهایی سبک‌تر
- عدم استفاده از Vite Dev Server در Production

Frontend Container:

```text
Container Port: 80
Host Port: 8080
```

پس:

```text
http://localhost:8080
```

---

# 20. Docker MongoDB

MongoDB از Image رسمی استفاده می‌کند:

```text
mongo:8.0
```

Container:

```text
mongodb
```

Port:

```text
27017:27017
```

اما نکته مهم Persistence است.

---

# 21. Docker Volume

Database باید Persistent باشد:

```text
MongoDB Container
       ↓
Named Volume
       ↓
MongoDB Data
```

اگر Container حذف شود، Volume می‌تواند داده‌ها را نگه دارد.

تفاوت:

```bash
docker compose down
```

Container و Network را پایین می‌آورد ولی Volume را حذف نمی‌کند.

اما:

```bash
docker compose down -v
```

Volume را نیز حذف می‌کند.

بنابراین دستور دوم می‌تواند باعث حذف داده‌های MongoDB شود.

---

# 22. Docker Network

Containerها باید از طریق Docker Network ارتباط برقرار کنند:

```text
frontend
   │
backend
   │
mongodb
```

Docker DNS اجازه می‌دهد Service Name به عنوان Hostname استفاده شود.

---

# 23. تفاوت localhost در Host و Container

این یکی از مهم‌ترین مفاهیم پروژه است.

### Local Development

Node روی Host:

```text
mongodb://localhost:27017/database
```

### Docker

Node داخل Container و MongoDB داخل Container دیگر:

```text
mongodb://mongodb:27017/database
```

چرا؟

داخل Backend Container:

```text
localhost
```

به خود Backend Container اشاره می‌کند، نه MongoDB.

در Docker باید از Service Name استفاده کنیم:

```text
mongodb
```

---

# 24. Docker Compose

Compose کل سیستم را مدیریت می‌کند:

```text
docker-compose.yml
```

Services:

```text
frontend
backend
mongodb
```

در پروژه فعلی برای مدیریت MongoDB از UI نیز:

```text
mongo-express
```

در نظر گرفته شده است.

---

# 25. معماری Compose

```text
                   Browser
                      │
                      ▼
             Frontend :8080
                 Nginx
                      │
                      ▼
             Backend :5000
             Node + Express
                      │
                      ▼
               MongoDB :27017
                      │
                      ▼
                 Volume
```

Mongo Express:

```text
Browser
  ↓
localhost:8081
  ↓
Mongo Express
  ↓
mongodb:27017
```

---

# 26. اجرای Docker Compose

از Root پروژه:

```bash
docker compose up -d
```

مشاهده Containerها:

```bash
docker compose ps
```

مشاهده Log:

```bash
docker compose logs
```

Log یک Service:

```bash
docker compose logs backend
```

خاموش کردن:

```bash
docker compose down
```

خاموش کردن + حذف Volume:

```bash
docker compose down -v
```

---

# 27. پورت‌های پروژه

نسخه فعلی:

| Service | Container | Host |
|---|---:|---:|
| Frontend / Nginx | 80 | 8080 |
| Backend | 5000 | 5000 |
| MongoDB | 27017 | 27017 |
| Mongo Express | 8081 | 8081 |

URLs:

```text
Frontend:
http://localhost:8080

Backend:
http://localhost:5000

Health:
http://localhost:5000/health

Mongo Express:
http://localhost:8081
```

---

# 28. Environment Variables

از `.env` برای Configuration استفاده می‌کنیم.

نمونه:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/app

JWT_SECRET=your-secret
JWT_EXPIRES_IN=1h
```

در Docker:

```env
MONGODB_URI=mongodb://mongodb:27017/app
```

و:

```text
.env.example
```

باید بدون Secret واقعی در Repository وجود داشته باشد.

---

# 29. Git Security

هرگز این موارد را Commit نکنید:

```text
.env
JWT Secret
Database Password
Private Credentials
Production Secrets
```

`.gitignore` باید `.env` را شامل شود.

---

# 30. تست نهایی Local

قبل از Docker بررسی کنید:

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

### MongoDB

```text
localhost:27017
```

### Authentication

- Signup
- Login
- JWT
- Protected Request
- Invalid Token
- Logout

### CRUD

- Create
- Read
- Update
- Delete

---

# 31. تست نهایی Docker

اجرای کامل:

```bash
docker compose up -d
```

بررسی:

```bash
docker compose ps
```

بررسی Backend:

```text
http://localhost:5000/health
```

بررسی Frontend:

```text
http://localhost:8080
```

بررسی Mongo Express:

```text
http://localhost:8081
```

بررسی Logs:

```bash
docker compose logs backend
docker compose logs frontend
docker compose logs mongodb
```

---

# 32. مشکلات مهمی که در پروژه باید بشناسیم

## Port Already in Use

اگر Docker نتواند Port را Bind کند:

```text
port is already allocated
```

باید بررسی شود چه Process یا Container پورت را استفاده می‌کند.

در Windows:

```powershell
netstat -ano | findstr :8080
```

یا:

```powershell
netstat -ano | findstr :5000
```

---

# 33. بررسی Network

لیست Network:

```bash
docker network ls
```

Inspect:

```bash
docker network inspect app-network
```

اتصال Container:

```bash
docker network connect app-network mongodb
```

اما در Compose بهتر است Network از طریق `docker-compose.yml` مدیریت شود و اتصال دستی فقط برای Troubleshooting یا آزمایش استفاده شود.

---

# 34. بررسی MongoDB Container

```bash
docker inspect mongodb
```

بررسی Volume:

```bash
docker volume ls
```

بررسی Container:

```bash
docker ps
```

---

# 35. Troubleshooting Strategy

هر Error را مرحله‌ای بررسی کنید:

```text
1. Error Message
       ↓
2. Identify Root Cause
       ↓
3. Check Container Status
       ↓
4. Check Logs
       ↓
5. Check Port
       ↓
6. Check Network
       ↓
7. Check Environment Variables
       ↓
8. Check Database Connection
       ↓
9. Apply Minimal Fix
       ↓
10. Retest
```

از تغییر همزمان چند فایل بدون مشخص شدن Root Cause خودداری کنید.

---

# 36. چک‌لیست نهایی پروژه

## Application

- [ ] React اجرا می‌شود
- [ ] Backend اجرا می‌شود
- [ ] MongoDB متصل است
- [ ] CRUD کامل است
- [ ] Authentication کامل است
- [ ] JWT Middleware فعال است
- [ ] Protected Routes فعال هستند
- [ ] Error Handling انجام شده
- [ ] Validation انجام شده
- [ ] Loading/Empty/Error State وجود دارد

## Docker

- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] Multi-stage React Build
- [ ] Nginx
- [ ] MongoDB Image
- [ ] Docker Network
- [ ] Named Volume
- [ ] Docker Compose
- [ ] Environment Variables
- [ ] Health Check
- [ ] Container-to-container communication

## GitHub

- [ ] README.md
- [ ] .gitignore
- [ ] .dockerignore
- [ ] .env.example
- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] Architecture documentation
- [ ] Local setup documentation
- [ ] Docker setup documentation
- [ ] Troubleshooting documentation

---

# 37. نقشه راه یادگیری

```text
JavaScript / TypeScript
        ↓
React
        ↓
HTTP / REST
        ↓
Node.js
        ↓
Express
        ↓
MongoDB
        ↓
Mongoose
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
Docker Network
        ↓
Docker Volume
        ↓
Docker Compose
        ↓
Nginx
        ↓
Production Architecture
```

---

# 38. مدل ذهنی نهایی

سه سطح را همیشه از هم جدا کنید:

## 1. Application Architecture

```text
React
+
Node.js / Express
+
MongoDB
```

## 2. Runtime Architecture

```text
Browser
+
Frontend Process
+
Backend Process
+
MongoDB Process
```

## 3. Container Architecture

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
```

Docker نباید Business Logic را تغییر دهد.

Docker فقط محیط اجرای Application را استاندارد و قابل حمل می‌کند.

---

# 39. دستورهای مهم

```bash
# Start local frontend
npm run dev

# Build backend
npm run build

# Start production backend
npm start

# Build backend image
docker build -t react-node-backend ./server

# Build frontend image
docker build -t react-frontend ./client

# Start Compose
docker compose up -d

# Stop Compose
docker compose down

# Stop + remove volumes
docker compose down -v

# List containers
docker ps

# Compose status
docker compose ps

# Logs
docker compose logs

# Service logs
docker compose logs backend

# Networks
docker network ls

# Volumes
docker volume ls
```

---

# 40. وضعیت هدف نهایی

در پایان پروژه باید بتوانیم:

```text
Browser
   │
   ▼
http://localhost:8080
   │
   ▼
React + Nginx Container
   │
   ▼
http://backend:5000
   │
   ▼
Node.js + Express Container
   │
   ▼
mongodb:27017
   │
   ▼
MongoDB Container
   │
   ▼
Named Volume
```

و تمام سیستم با یک دستور بالا بیاید:

```bash
docker compose up -d
```

---

# 41. اصل معماری پروژه

اصل اصلی این پروژه:

> **Application First — Container Second**

ابتدا باید بفهمیم:

```text
React چگونه کار می‌کند؟
Node چگونه API می‌دهد؟
MongoDB چگونه داده ذخیره می‌کند؟
JWT چگونه Authentication را انجام می‌دهد؟
```

سپس یاد می‌گیریم:

```text
Docker چگونه همین Application را
در یک Runtime قابل حمل اجرا می‌کند؟
```

این تفکیک باعث می‌شود Docker را به‌عنوان یک ابزار واقعی DevOps بفهمیم، نه مجموعه‌ای از دستورهای حفظی.

---

# 42. مسیر ادامه پروژه

ترتیب پیشنهادی ادامه کار:

```text
1. تثبیت نسخه Local
2. تست کامل CRUD
3. تست Authentication
4. تست JWT / 401
5. تکمیل Error Handling
6. تکمیل Environment Configuration
7. بررسی Dockerfiles
8. بررسی MongoDB Container
9. بررسی Network
10. بررسی Volume
11. تکمیل docker-compose.yml
12. اجرای کامل Compose
13. تست ارتباط Frontend → Backend → MongoDB
14. تست Persistence
15. تست Restart
16. تست Failure Scenarios
17. بهبود README
18. آماده‌سازی GitHub Portfolio
```

---

## نتیجه

این پروژه در نهایت یک نمونه واقعی Full-Stack Portfolio خواهد بود که علاوه بر توسعه نرم‌افزار، مفاهیم زیر را نشان می‌دهد:

- React Development
- REST API Development
- Node.js / Express
- MongoDB / Mongoose
- Authentication / JWT
- Middleware
- Error Handling
- Docker
- Docker Compose
- Container Networking
- Persistent Storage
- Nginx
- Environment Configuration
- Production-oriented Architecture

هدف نهایی این نیست که فقط بگوییم «برنامه داخل Docker اجرا می‌شود».

هدف این است که بتوانیم دقیقاً توضیح دهیم:

**Application چگونه ساخته شده، چگونه اجرا می‌شود، چگونه اجزای آن با هم ارتباط دارند، Docker چه تغییری در Runtime ایجاد می‌کند، و چرا معماری نهایی قابل نگهداری و قابل استقرار است.**
