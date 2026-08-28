# Dockerization Guide --- React + Node.js + MongoDB

## 1. هدف این مرحله

در این پروژه ابتدا Application بدون Docker ساخته و تست شد:

``` text
React
   ↓
Node.js + Express
   ↓
MongoDB (Local Host)
```

سپس Dockerization را شروع کردیم.

تا اینجا وضعیت پروژه:

``` text
Browser
   ↓
React + Nginx Container
   ↓
Node.js + Express Container
   ↓
MongoDB روی Host Windows
```

> نکته: در این مرحله MongoDB هنوز داخل Docker نیست. هدف این راهنما
> مستندسازی Dockerization فعلی تا همین مرحله است.

------------------------------------------------------------------------

# 2. پیش‌نیازها

موارد زیر باید نصب و آماده باشند:

-   Docker Desktop
-   Node.js
-   npm
-   React/Vite project
-   Node.js/Express backend
-   MongoDB روی Host

بررسی Docker:

``` powershell
docker --version
docker compose version
```

بررسی MongoDB:

``` powershell
Test-NetConnection localhost -Port 27017
```

اگر مقدار زیر را دیدید:

``` text
TcpTestSucceeded : True
```

یعنی MongoDB روی Host در دسترس است.

------------------------------------------------------------------------

# 3. ساختار پروژه

ساختار کلی پروژه:

``` text
13.NodeJs/
├── client/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── ...
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── ...
│
└── ...
```

------------------------------------------------------------------------

# 4. Dockerize کردن Backend

## 4.1 هدف

Backend باید داخل یک Container اجرا شود:

``` text
Node.js Container
      ↓
Express
      ↓
MongoDB
```

در این مرحله MongoDB روی Windows Host اجرا می‌شود.

بنابراین Backend Container برای دسترسی به MongoDB از:

``` text
host.docker.internal
```

استفاده می‌کند.

------------------------------------------------------------------------

# 5. MongoDB Connection در Docker

وقتی Backend مستقیماً روی Windows اجرا می‌شود:

``` text
mongodb://localhost:27017/react-node-mongodb
```

ولی وقتی Backend داخل Container اجرا می‌شود:

``` text
mongodb://host.docker.internal:27017/react-node-mongodb
```

## چرا؟

`localhost` داخل Container به خود Container اشاره می‌کند، نه به Windows
Host.

بنابراین:

``` text
localhost
```

در Backend Container یعنی:

``` text
Backend Container
```

اما:

``` text
host.docker.internal
```

یعنی:

``` text
Windows Host
```

پس در مرحله فعلی:

``` text
Backend Container
       ↓
host.docker.internal:27017
       ↓
MongoDB روی Windows
```

------------------------------------------------------------------------

# 6. اجرای Backend Container

ابتدا اگر Container قبلی وجود دارد حذف کنید:

``` powershell
docker rm -f react-node-backend
```

Image را Build کنید:

``` powershell
docker build -t react-node-backend ./server
```

Backend را اجرا کنید:

``` powershell
docker run --name react-node-backend `
  -p 5000:5000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/react-node-mongodb" `
  -e JWT_SECRET="dev-super-secret-key-change-me" `
  react-node-backend
```

## توضیح پارامترها

### `--name`

``` text
--name react-node-backend
```

نام Container را مشخص می‌کند.

### `-p`

``` text
-p 5000:5000
```

فرمت:

``` text
HOST_PORT:CONTAINER_PORT
```

یعنی:

``` text
Windows :5000
    ↓
Container :5000
```

پس Browser می‌تواند Backend را از این آدرس ببیند:

``` text
http://localhost:5000
```

### `-e`

``` text
-e MONGODB_URI="..."
```

یک Environment Variable داخل Container ایجاد می‌کند.

همچنین:

``` text
-e JWT_SECRET="..."
```

برای JWT Secret است.

------------------------------------------------------------------------

# 7. خروجی مورد انتظار Backend

اگر همه چیز درست باشد:

``` text
🚀 app.ts started
Starting server...
Connecting to MongoDB...
MongoDB connected.
MongoDB connection completed.
Starting Express on port 5000...
Server running on http://localhost:5000
```

قسمت مهم:

``` text
MongoDB connected.
```

یعنی Backend Container توانسته به MongoDB روی Host متصل شود.

------------------------------------------------------------------------

# 8. Health Check Backend

اگر Endpoint زیر در پروژه وجود دارد:

``` text
GET /health
```

در Browser یا ابزار API آن را تست کنید:

``` text
http://localhost:5000/health
```

هدف Health Endpoint این است که سریع مشخص کند Backend در دسترس است.

------------------------------------------------------------------------

# 9. Dockerize کردن React

برای React از Multi-stage Docker Build استفاده کردیم.

## Dockerfile

فایل:

``` text
client/Dockerfile
```

محتوای فعلی:

``` dockerfile
# Stage 1: Build React application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Serve React with Nginx
FROM nginx:1.29-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# React Router configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

------------------------------------------------------------------------

# 10. چرا Multi-stage Build؟

Dockerfile دو Stage دارد.

## Stage 1 --- Build

``` dockerfile
FROM node:22-alpine AS build
```

در این مرحله Node.js فقط برای Build کردن React استفاده می‌شود.

``` text
Node.js
   ↓
npm ci
   ↓
npm run build
   ↓
dist/
```

خروجی:

``` text
/app/dist
```

## Stage 2 --- Production Server

``` dockerfile
FROM nginx:1.29-alpine
```

در این مرحله دیگر Node.js لازم نیست.

فقط فایل‌های Build شده React را با Nginx سرو می‌کنیم:

``` text
dist/
   ↓
Nginx
   ↓
Browser
```

مزیت:

-   Image نهایی سبک‌تر است.
-   Node.js در Runtime لازم نیست.
-   Production architecture بهتر است.
-   React با Web Server مناسب سرو می‌شود.

------------------------------------------------------------------------

# 11. مشکل React Router و Nginx

بعد از اجرای Frontend Container با:

``` powershell
docker run --name react-frontend -p 3200:80 react-frontend
```

صفحه اصلی باز می‌شد، اما وقتی مستقیماً وارد:

``` text
http://localhost:3200/dashboard
```

شدیم، Nginx خطای 404 داد.

خطا:

``` text
open() "/usr/share/nginx/html/dashboard" failed
```

## علت

React یک SPA است.

Route زیر:

``` text
/dashboard
```

یک فایل فیزیکی به نام:

``` text
/usr/share/nginx/html/dashboard
```

ندارد.

React Router باید این route را مدیریت کند، اما قبل از React، درخواست به
Nginx می‌رسد.

Nginx به صورت پیش‌فرض دنبال فایل `dashboard` می‌گردد و چون پیدا نمی‌کند:

``` text
404 Not Found
```

برمی‌گرداند.

------------------------------------------------------------------------

# 12. راه‌حل React Router

در `client` فایل زیر را ایجاد کردیم:

``` text
client/nginx.conf
```

محتوا:

``` nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

مهم‌ترین قسمت:

``` nginx
try_files $uri $uri/ /index.html;
```

یعنی:

1.  اگر فایل واقعی وجود دارد، همان فایل را بده.
2.  اگر directory وجود دارد، آن را بررسی کن.
3.  اگر پیدا نشد، `index.html` را برگردان.

در نتیجه:

``` text
GET /dashboard
      ↓
Nginx
      ↓
dashboard file پیدا نشد
      ↓
index.html
      ↓
React
      ↓
React Router
      ↓
Dashboard
```

------------------------------------------------------------------------

# 13. Build کردن Frontend Image

ابتدا Container قبلی را حذف کنید:

``` powershell
docker rm -f react-frontend
```

از Root پروژه:

``` powershell
docker build -t react-frontend ./client
```

در صورت موفقیت باید Build بدون Error تمام شود.

------------------------------------------------------------------------

# 14. اجرای Frontend Container

``` powershell
docker run --name react-frontend -p 3200:80 react-frontend
```

توضیح:

``` text
-p 3200:80
```

یعنی:

``` text
Windows Host :3200
       ↓
Nginx Container :80
```

بنابراین Frontend از این آدرس قابل دسترسی است:

``` text
http://localhost:3200
```

------------------------------------------------------------------------

# 15. خروجی مورد انتظار Nginx

خروجی مشابه:

``` text
Configuration complete; ready for start up
nginx/1.29.8
start worker processes
```

نشانه این است که Nginx داخل Container اجرا شده است.

------------------------------------------------------------------------

# 16. تست Frontend

صفحه اصلی:

``` text
http://localhost:3200
```

Route مستقیم:

``` text
http://localhost:3200/dashboard
```

هر دو باید بدون 404 باز شوند.

------------------------------------------------------------------------

# 17. خطای JWT_SECRET

در زمان Login با این خطا مواجه شدیم:

``` text
POST http://localhost:5000/api/auth/login 400 (Bad Request)
```

و در response:

``` text
JWT_SECRET is not configured.
```

## علت

Backend داخل Docker به `.env` روی Host دسترسی خودکار ندارد.

ما ابتدا فقط این Environment Variable را هنگام اجرای Container ارسال
کرده بودیم:

``` text
MONGODB_URI
```

اما Backend به این مقدار هم نیاز داشت:

``` text
JWT_SECRET
```

بنابراین داخل Container:

``` text
MONGODB_URI  ✅
JWT_SECRET   ❌
```

بود.

------------------------------------------------------------------------

# 18. اصلاح JWT_SECRET

Container را حذف کنید:

``` powershell
docker rm -f react-node-backend
```

سپس Backend را با هر دو Environment Variable اجرا کنید:

``` powershell
docker run --name react-node-backend `
  -p 5000:5000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/react-node-mongodb" `
  -e JWT_SECRET="dev-super-secret-key-change-me" `
  react-node-backend
```

برای Production نباید Secret واقعی را داخل Dockerfile یا Git commit
کنیم.

------------------------------------------------------------------------

# 19. اجرای کامل فعلی

برای اجرای سیستم فعلی، ابتدا MongoDB روی Host باید روشن باشد.

سپس Backend:

``` powershell
docker rm -f react-node-backend
docker build -t react-node-backend ./server
docker run --name react-node-backend `
  -p 5000:5000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/react-node-mongodb" `
  -e JWT_SECRET="dev-super-secret-key-change-me" `
  react-node-backend
```

در PowerShell دوم، Frontend:

``` powershell
docker rm -f react-frontend
docker build -t react-frontend ./client
docker run --name react-frontend -p 3200:80 react-frontend
```

------------------------------------------------------------------------

# 20. معماری فعلی

در این مرحله:

``` text
                    Windows Host
┌──────────────────────────────────────────────┐
│                                              │
│  MongoDB :27017                              │
│       ▲                                      │
│       │ host.docker.internal                 │
│       │                                      │
│  ┌────┴─────────────────┐                   │
│  │ Backend Container     │                   │
│  │ Node.js + Express     │                   │
│  │ Port 5000             │                   │
│  └──────────▲────────────┘                   │
│             │                                │
│             │ HTTP                           │
│  ┌──────────┴────────────┐                   │
│  │ Frontend Container     │                  │
│  │ Nginx + React          │                  │
│  │ Port 80                │                  │
│  └────────────────────────┘                  │
│                                              │
└──────────────────────────────────────────────┘
                    ▲
                    │
             localhost:3200
                    │
                 Browser
```

------------------------------------------------------------------------

# 21. Host و Container را اشتباه نگیریم

این موضوع در Docker بسیار مهم است.

اگر Backend روی Host اجرا شود:

``` text
mongodb://localhost:27017/...
```

درست است.

اگر Backend داخل Container باشد و MongoDB روی Host باشد:

``` text
mongodb://host.docker.internal:27017/...
```

درست است.

اگر Backend و MongoDB هر دو داخل Docker Compose باشند:

``` text
mongodb://mongodb:27017/...
```

درست است.

در Docker:

``` text
localhost
```

به معنی "همین Container" است.

برای ارتباط Container با Container نباید از:

``` text
localhost
```

استفاده کنیم.

باید از نام Service استفاده کنیم.

مثلاً:

``` text
mongodb
```

------------------------------------------------------------------------

# 22. چرا هنوز Docker Compose نساخته‌ایم؟

هدف پروژه این است که Docker را مرحله‌به‌مرحله یاد بگیریم.

تا اینجا:

``` text
1. Backend Dockerized       ✅
2. Frontend Dockerized      ✅
3. Nginx configured         ✅
4. React Router fixed       ✅
5. MongoDB connection       ✅
6. JWT environment variable ✅
7. Docker Compose           ⏳
8. MongoDB Container        ⏳
9. Docker Network            ⏳
10. Named Volume             ⏳
```

بنابراین هنوز نباید معماری را یکباره تغییر دهیم.

------------------------------------------------------------------------

# 23. مرحله بعدی پروژه

مرحله بعد:

``` text
MongoDB
   ↓
Docker Container
```

سپس:

``` text
React Container
      ↓
Node Container
      ↓
MongoDB Container
```

و بعد Docker Compose:

``` text
docker-compose.yml
```

با Serviceهای:

``` text
frontend
backend
mongodb
```

------------------------------------------------------------------------

# 24. معماری نهایی موردنظر

در نهایت:

``` text
                         Docker Network
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│                              ┌──────────────┐                                  │
│                              │   frontend   │                                  │
│                              │ React + Nginx│                                  │
│                              │     :80      │                                  │
│                              └───────┬──────┘                                  │
│                                      │                                         │
│                                      ▼                                         │
│                              ┌──────────────┐                                  │
│                              │   backend    │                                  │
│                              │ Node+Express │                                  │
│                              │     :5000    │                                  │
│                              └───────┬──────┘                                  │
│                                      │                                         │
│                                      ▼                                         │
│                              ┌──────────────┐                                  │
│                              │   mongodb    │                                  │
│                              │    :27017    │                                  │
│                              └───────┬──────┘                                  │
│                                      │                                         │
│                                      ▼                                         │
│                              ┌──────────────────┐                              │
│                              │ Named Volume     │                              │
│                              │ Persistent Data  │                              │
│                              └──────────────────┘                              │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
                     ▲
                     │
                  Browser
```

------------------------------------------------------------------------

# 25. نکته مهم درباره MongoDB Volume

وقتی MongoDB را Dockerize کنیم، باید از Named Volume استفاده کنیم.

هدف:

``` text
MongoDB Container
       ↓
Named Volume
       ↓
Database Data
```

اگر Container حذف شود، Data نباید به صورت خودکار از بین برود.

تفاوت مهم:

``` powershell
docker compose down
```

Container و Network را پایین می‌آورد، ولی Volume را حفظ می‌کند.

در مقابل:

``` powershell
docker compose down -v
```

علاوه بر Container و Network، Volume را هم حذف می‌کند.

بنابراین:

``` text
down
    → database data محفوظ

down -v
    → database volume حذف
    → database data حذف
```

در استفاده از `down -v` باید دقت کرد.

------------------------------------------------------------------------

# 26. Environment Variables

در پروژه حرفه‌ای نباید Secretها را hardcode کنیم.

فایل:

``` text
.env
```

برای مقدارهای محیطی استفاده می‌شود.

مثلاً:

``` env
PORT=5000
MONGODB_URI=...
JWT_SECRET=...
```

و فایل:

``` text
.env.example
```

باید بدون Secret واقعی در Git قرار بگیرد.

مثلاً:

``` env
PORT=5000
MONGODB_URI=
JWT_SECRET=
```

`.env` نباید commit شود.

در پروژه باید `.gitignore` شامل مواردی مثل این باشد:

``` gitignore
.env
.env.*
!.env.example
```

------------------------------------------------------------------------

# 27. Docker Image و Container

این دو را با هم اشتباه نکنیم.

## Image

Image یک Template/Package برای اجرای Application است.

مثلاً:

``` text
react-frontend
react-node-backend
```

## Container

Container یک Instance در حال اجرای Image است.

مثلاً:

``` text
react-frontend
react-node-backend
```

می‌توانیم:

``` text
Image
   ↓
Container
```

داشته باشیم.

مثلاً:

``` powershell
docker build -t react-frontend ./client
```

Image می‌سازد.

و:

``` powershell
docker run --name react-frontend -p 3200:80 react-frontend
```

از آن Image یک Container اجرا می‌کند.

------------------------------------------------------------------------

# 28. دستورات مهم Docker

مشاهده Imageها:

``` powershell
docker images
```

مشاهده Containerهای در حال اجرا:

``` powershell
docker ps
```

مشاهده تمام Containerها:

``` powershell
docker ps -a
```

مشاهده Log:

``` powershell
docker logs react-node-backend
```

مشاهده Log به صورت زنده:

``` powershell
docker logs -f react-node-backend
```

Stop:

``` powershell
docker stop react-node-backend
```

Start:

``` powershell
docker start react-node-backend
```

حذف Container:

``` powershell
docker rm react-node-backend
```

حذف اجباری:

``` powershell
docker rm -f react-node-backend
```

------------------------------------------------------------------------

# 29. Troubleshooting

## مشکل: JWT_SECRET is not configured

بررسی کنید Container با این Environment Variable اجرا شده باشد:

``` powershell
-e JWT_SECRET="..."
```

------------------------------------------------------------------------

## مشکل: MongoDB connection failed

ابتدا روی Host بررسی کنید:

``` powershell
Test-NetConnection localhost -Port 27017
```

سپس مطمئن شوید Backend Container از:

``` text
host.docker.internal
```

استفاده می‌کند، نه:

``` text
localhost
```

------------------------------------------------------------------------

## مشکل: `/dashboard` با 404 مواجه می‌شود

بررسی کنید:

``` text
client/nginx.conf
```

وجود داشته باشد و شامل این باشد:

``` nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

همچنین Docker Image را بعد از تغییر دوباره Build کنید:

``` powershell
docker build -t react-frontend ./client
```

------------------------------------------------------------------------

## مشکل: تغییر Dockerfile اعمال نشده

بعد از تغییر Dockerfile یا nginx.conf، Image قبلی خودکار تغییر نمی‌کند.

دوباره Build کنید:

``` powershell
docker build -t react-frontend ./client
```

سپس Container جدید را اجرا کنید.

------------------------------------------------------------------------

# 30. اصل مهم پروژه

اصل اصلی این پروژه:

``` text
First make the application work.
Then make it portable.
```

Docker نباید Business Logic پروژه را تغییر دهد.

Application Architecture:

``` text
React
+
Node.js / Express
+
MongoDB
```

Container Architecture:

``` text
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

Docker فقط Runtime/Deployment Environment را تغییر می‌دهد؛ معماری
Business Application نباید به Docker وابسته باشد.

------------------------------------------------------------------------

# 31. وضعیت پروژه تا اینجا

``` text
Application بدون Docker                 ✅
MongoDB روی Host                        ✅
Backend Dockerfile                      ✅
Backend Image                           ✅
Backend Container                       ✅
Backend → Host MongoDB                  ✅
JWT_SECRET در Container                 ✅
React Multi-stage Dockerfile            ✅
React Build                             ✅
Nginx Container                         ✅
React Router + Nginx                    ✅
Frontend Container                      ✅
Docker Compose                          ⏳
MongoDB Container                       ⏳
Docker Network                          ⏳
MongoDB Named Volume                    ⏳
Full Docker Compose Architecture        ⏳
```

## قدم بعد

مرحله بعدی باید **Dockerize کردن MongoDB** باشد و سپس Docker Compose را
ایجاد کنیم.

ترتیب ادامه:

``` text
MongoDB Container
      ↓
Named Volume
      ↓
Docker Network
      ↓
Backend → mongodb
      ↓
Frontend → Backend
      ↓
docker compose up
```
