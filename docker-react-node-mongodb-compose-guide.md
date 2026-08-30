# Dockerizing React + Node.js + MongoDB with Docker Compose

## 1. هدف این مرحله

در این مرحله یک Full-Stack application شامل:

- React
- Node.js
- Express.js
- MongoDB
- Mongo Express
- Docker
- Docker Compose

را به صورت containerized اجرا می‌کنیم.

هدف این نیست که معماری برنامه را به Docker وابسته کنیم.

معماری برنامه همچنان:

```text
React
   ↓
Node.js / Express
   ↓
MongoDB
```

است.

Docker فقط محیط اجرای برنامه را فراهم می‌کند:

```text
React Container
Node.js Container
MongoDB Container
Docker Network
Docker Volume
Docker Compose
```

---

# 2. معماری نهایی

معماری نهایی:

```text
                         Browser
                            |
              +-------------+-------------+
              |                           |
              v                           v
       React :8080                  Backend :5000
              |                           |
              |                           v
              |                    MongoDB :27017
              |                           |
              |                           v
              |                    mongodb_data
              |                         Volume
              |
              +---- Mongo Express :8081
```

از دید Docker:

```text
app-network
|
+-- react-frontend
|
+-- react-node-backend
|
+-- mongodb
|
+-- mongo-express
```

---

# 3. Host و Container

یکی از مهم‌ترین مفاهیم Docker، تفاوت Host و Container است.

## Host

Host همان سیستم Windows است که Docker Desktop روی آن اجرا می‌شود.

مثلاً:

```text
localhost:8080
localhost:5000
localhost:8081
localhost:27017
```

این آدرس‌ها از دید Windows هستند.

## Container

هر سرویس داخل یک محیط جداگانه اجرا می‌شود:

```text
frontend
backend
mongodb
mongo-express
```

Containerها می‌توانند از طریق Docker Network با یکدیگر ارتباط برقرار کنند.

---

# 4. مفهوم localhost در Docker

فرض کنیم Backend داخل یک container اجرا می‌شود.

اگر Backend از این استفاده کند:

```text
mongodb://localhost:27017
```

`localhost` به خود Backend container اشاره می‌کند.

یعنی:

```text
Backend Container
       |
       X
localhost
```

نه به MongoDB container.

بنابراین وقتی MongoDB در container جداگانه است، باید از نام service استفاده کنیم:

```text
mongodb://mongodb:27017
```

---

# 5. چرا از mongodb به عنوان Hostname استفاده می‌کنیم؟

در Compose داریم:

```yaml
services:

  mongodb:
    image: mongo:8.0
```

نام service:

```text
mongodb
```

است.

Docker Compose برای serviceها DNS داخلی ایجاد می‌کند.

بنابراین Backend می‌تواند این hostname را resolve کند:

```text
mongodb
```

پس:

```text
mongodb://mongodb:27017/react-node-mongodb
```

یعنی:

```text
Backend Container
       |
       | mongodb:27017
       v
MongoDB Container
```

---

# 6. تفاوت host.docker.internal و mongodb

در مرحله قبل Backend با MongoDB نصب‌شده روی Windows اجرا می‌شد:

```text
mongodb://host.docker.internal:27017/react-node-mongodb
```

معماری آن:

```text
Backend Container
       |
       v
host.docker.internal
       |
       v
Windows Host
       |
       v
MongoDB installed on Windows
```

اما در Compose می‌خواهیم MongoDB هم داخل Docker باشد:

```text
mongodb://mongodb:27017/react-node-mongodb
```

معماری جدید:

```text
Backend Container
       |
       v
Docker Network
       |
       v
MongoDB Container
```

بنابراین:

```text
host.docker.internal
```

برای این معماری لازم نیست.

---

# 7. Docker Images فعلی

در این مرحله فرض می‌کنیم دو image قبلاً ساخته شده‌اند:

```text
react-node-backend
react-frontend
```

بررسی:

```powershell
docker images
```

ساخت Backend image:

```powershell
docker build -t react-node-backend ./server
```

ساخت Frontend image:

```powershell
docker build -t react-frontend ./client
```

---

# 8. Backend با docker run

قبل از Compose، Backend می‌توانست با این دستور اجرا شود:

```powershell
docker run --name react-node-backend `
  -p 5000:5000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/react-node-mongodb" `
  -e JWT_SECRET="YOUR_SECRET" `
  react-node-backend
```

در این حالت:

```text
Backend Container
       |
       v
Windows Host
       |
       v
Local MongoDB
```

اکنون می‌خواهیم Local MongoDB را حذف کنیم و MongoDB را containerize کنیم.

---

# 9. Frontend با docker run

Frontend قبلاً:

```powershell
docker run --name react-frontend -p 3200:80 react-frontend
```

اجرا می‌شد.

اما Windows پورت `3200` را در یک excluded port range داشت.

بررسی:

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

محدوده زیر شامل 3200 بود:

```text
3184 - 3283
```

بنابراین از پورت دیگری استفاده کردیم:

```text
8080
```

mapping نهایی:

```text
localhost:8080 -> frontend:80
```

---

# 10. چرا Docker Compose؟

اگر containerها را دستی اجرا کنیم، باید چند دستور جداگانه اجرا کنیم:

```text
docker run mongodb
docker run backend
docker run frontend
docker run mongo-express
```

همچنین باید موارد زیر را دستی مدیریت کنیم:

- Network
- Volume
- Environment variables
- Port mapping
- Container dependencies

Docker Compose همه این موارد را در یک فایل تعریف می‌کند:

```text
docker-compose.yml
```

سپس کل سیستم با:

```powershell
docker compose up -d
```

اجرا می‌شود.

---

# 11. فایل docker-compose.yml

فایل در root پروژه قرار می‌گیرد:

```text
13.NodeJs/
|
+-- client/
+-- server/
+-- docker-compose.yml
```

نسخه فعلی:

```yaml
services:

  mongodb:
    image: mongo:8.0
    container_name: mongodb
    restart: unless-stopped

    ports:
      - "27017:27017"

    volumes:
      - mongodb_data:/data/db

    networks:
      - app-network


  backend:
    image: react-node-backend
    container_name: react-node-backend
    restart: unless-stopped

    ports:
      - "5000:5000"

    environment:
      MONGODB_URI: mongodb://mongodb:27017/react-node-mongodb
      JWT_SECRET: YOUR_SECRET

    depends_on:
      - mongodb

    networks:
      - app-network


  frontend:
    image: react-frontend
    container_name: react-frontend
    restart: unless-stopped

    ports:
      - "8080:80"

    depends_on:
      - backend

    networks:
      - app-network


  mongo-express:
    image: mongo-express:1.0.2
    container_name: mongo-express
    restart: unless-stopped

    ports:
      - "8081:8081"

    environment:
      ME_CONFIG_MONGODB_URL: mongodb://mongodb:27017/
      ME_CONFIG_BASICAUTH_ENABLED: "true"
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: admin123

    depends_on:
      - mongodb

    networks:
      - app-network


volumes:
  mongodb_data:


networks:
  app-network:
    driver: bridge
```

---

# 12. توضیح MongoDB Service

قسمت:

```yaml
mongodb:
  image: mongo:8.0
```

از image رسمی MongoDB استفاده می‌کند.

نسخه مشخص شده است:

```text
8.0
```

بهتر است به صورت کورکورانه از:

```text
mongo:latest
```

استفاده نکنیم، چون نسخه latest ممکن است در آینده تغییر کند.

---

# 13. MongoDB Port

داریم:

```yaml
ports:
  - "27017:27017"
```

ساختار:

```text
HOST PORT : CONTAINER PORT
```

بنابراین:

```text
27017:27017
```

یعنی:

```text
Windows localhost:27017
        |
        v
MongoDB Container:27017
```

این mapping برای ابزارهایی مانند MongoDB Compass مفید است.

اما Backend برای اتصال به MongoDB از این mapping استفاده نمی‌کند.

Backend از Docker Network استفاده می‌کند:

```text
mongodb:27017
```

---

# 14. MongoDB Volume

قسمت:

```yaml
volumes:
  - mongodb_data:/data/db
```

یکی از مهم‌ترین قسمت‌های MongoDB است.

MongoDB داده‌های خود را در:

```text
/data/db
```

نگه می‌دارد.

ما این مسیر را به named volume وصل می‌کنیم:

```text
mongodb_data
```

معماری:

```text
MongoDB Container
       |
       v
/data/db
       |
       v
mongodb_data Volume
```

بنابراین حذف/recreate کردن container به صورت معمول باعث حذف داده‌های Volume نمی‌شود.

---

# 15. بررسی Volume

لیست Volumeها:

```powershell
docker volume ls
```

برای inspect:

```powershell
docker volume inspect <volume-name>
```

نام واقعی Volume در Compose معمولاً با نام project ترکیب می‌شود.

مثلاً ممکن است چیزی شبیه:

```text
13nodejs_mongodb_data
```

باشد.

---

# 16. تفاوت down و down -v

دستور:

```powershell
docker compose down
```

معمولاً موارد زیر را حذف می‌کند:

```text
Containers
Network
```

اما Volume را نگه می‌دارد.

بنابراین:

```text
docker compose down
|
+-- Containers removed
+-- Network removed
+-- mongodb_data preserved
```

اما:

```powershell
docker compose down -v
```

Volume را نیز حذف می‌کند:

```text
docker compose down -v
|
+-- Containers removed
+-- Network removed
+-- mongodb_data removed
|
+-- MongoDB data deleted
```

پس:

```text
down
```

و:

```text
down -v
```

را نباید یکسان در نظر گرفت.

---

# 17. Backend Service

Backend از image زیر استفاده می‌کند:

```yaml
image: react-node-backend
```

Port:

```yaml
ports:
  - "5000:5000"
```

یعنی:

```text
Windows
localhost:5000
      |
      v
Backend Container:5000
```

---

# 18. Backend Environment Variables

Backend نیاز دارد MongoDB URI و JWT secret را دریافت کند:

```yaml
environment:
  MONGODB_URI: mongodb://mongodb:27017/react-node-mongodb
  JWT_SECRET: YOUR_SECRET
```

در Node.js این مقادیر از:

```javascript
process.env.MONGODB_URI
process.env.JWT_SECRET
```

خوانده می‌شوند.

---

# 19. Backend -> MongoDB

URI صحیح در Docker:

```text
mongodb://mongodb:27017/react-node-mongodb
```

جزء به جزء:

```text
mongodb://
mongodb
:
27017
/
react-node-mongodb
```

یعنی:

- Protocol: `mongodb`
- Host: `mongodb`
- Port: `27017`
- Database: `react-node-mongodb`

Host اینجا همان Docker Compose service name است.

---

# 20. Frontend Service

Frontend از image:

```yaml
image: react-frontend
```

استفاده می‌کند.

Port mapping:

```yaml
ports:
  - "8080:80"
```

یعنی:

```text
Windows
localhost:8080
      |
      v
Frontend Container:80
      |
      v
Nginx
      |
      v
React Build
```

Browser:

```text
http://localhost:8080
```

---

# 21. Browser -> Backend

React در نهایت در Browser اجرا می‌شود.

Browser خارج از Docker Network است.

بنابراین API معمولاً از این طریق قابل دسترسی است:

```text
http://localhost:5000
```

نه:

```text
http://backend:5000
```

چون:

```text
backend
```

نامی است که Docker داخل network می‌شناسد.

در حالت معمول:

```text
Browser
   |
   | localhost:5000
   v
Windows Host
   |
   v
Backend Container
```

---

# 22. Backend -> MongoDB

در مقابل Backend داخل Docker است.

بنابراین:

```text
Backend Container
       |
       | mongodb:27017
       v
MongoDB Container
```

پس دو ارتباط متفاوت داریم:

```text
Browser -> localhost:5000 -> Backend

Backend -> mongodb:27017 -> MongoDB
```

این تفاوت باید همیشه در ذهن باشد.

---

# 23. Mongo Express

MongoDB به صورت عادی Web UI ندارد.

برای مدیریت MongoDB از مرورگر، Mongo Express اضافه می‌شود.

معماری:

```text
Browser
   |
   | localhost:8081
   v
Mongo Express
   |
   | mongodb:27017
   v
MongoDB
```

---

# 24. Mongo Express Environment Variables

تنظیمات:

```yaml
environment:
  ME_CONFIG_MONGODB_URL: mongodb://mongodb:27017/
  ME_CONFIG_BASICAUTH_ENABLED: "true"
  ME_CONFIG_BASICAUTH_USERNAME: admin
  ME_CONFIG_BASICAUTH_PASSWORD: admin123
```

این environment variables مربوط به Mongo Express هستند.

نباید آنها را زیر `mongodb` قرار داد.

اشتباه:

```yaml
mongodb:
  environment:
    ME_CONFIG_BASICAUTH_ENABLED: "true"
```

صحیح:

```yaml
mongo-express:
  environment:
    ME_CONFIG_BASICAUTH_ENABLED: "true"
```

---

# 25. Mongo Express Login

URL:

```text
http://localhost:8081
```

Username:

```text
admin
```

Password:

```text
admin123
```

این credentials فقط برای development مناسب هستند.

در production باید credentials امن و secret management مناسب استفاده شود.

---

# 26. Docker Network

در Compose:

```yaml
networks:
  app-network:
    driver: bridge
```

سپس serviceها:

```yaml
networks:
  - app-network
```

را دریافت می‌کنند.

در نتیجه:

```text
app-network
|
+-- mongodb
+-- backend
+-- frontend
+-- mongo-express
```

---

# 27. Docker DNS

Docker Network یک DNS داخلی فراهم می‌کند.

وقتی service داریم:

```yaml
mongodb:
```

سایر containerهای همان network می‌توانند آن را با:

```text
mongodb
```

پیدا کنند.

بنابراین:

```text
mongodb:27017
```

به MongoDB container اشاره می‌کند.

نیازی نیست IP container را hardcode کنیم.

---

# 28. depends_on

Backend:

```yaml
depends_on:
  - mongodb
```

Frontend:

```yaml
depends_on:
  - backend
```

Mongo Express:

```yaml
depends_on:
  - mongodb
```

هدف `depends_on` ایجاد ترتیب اولیه startup است.

اما نکته مهم:

`depends_on` به تنهایی تضمین نمی‌کند که سرویس مقصد کاملاً ready شده است.

مثلاً ممکن است container MongoDB در حال start شدن باشد و Backend سریع‌تر شروع شود.

برای محیط حرفه‌ای‌تر باید Healthcheck و readiness را نیز در نظر گرفت.

---

# 29. اجرای Compose

از root پروژه:

```powershell
docker compose up -d
```

Compose موارد زیر را ایجاد/اجرا می‌کند:

```text
Network
MongoDB
Backend
Frontend
Mongo Express
```

---

# 30. بررسی وضعیت

```powershell
docker compose ps
```

انتظار:

```text
mongodb              Up
react-node-backend   Up
react-frontend       Up
mongo-express        Up
```

Portها:

```text
MongoDB       27017 -> 27017
Backend       5000  -> 5000
Frontend      8080  -> 80
Mongo Express 8081  -> 8081
```

---

# 31. URLهای نهایی

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:5000
```

Mongo Express:

```text
http://localhost:8081
```

MongoDB برای ابزارهای Host:

```text
mongodb://localhost:27017
```

MongoDB برای Backend:

```text
mongodb://mongodb:27017/react-node-mongodb
```

---

# 32. تست مرحله‌ای

بعد از:

```powershell
docker compose up -d
```

ابتدا:

```powershell
docker compose ps
```

را بررسی کن.

سپس Mongo Express:

```text
http://localhost:8081
```

سپس Frontend:

```text
http://localhost:8080
```

سپس Backend:

```text
http://localhost:5000
```

اگر Health endpoint وجود دارد:

```text
http://localhost:5000/health
```

---

# 33. تست MongoDB

ورود به MongoDB container:

```powershell
docker exec -it mongodb mongosh
```

سپس:

```javascript
show dbs
```

انتخاب database:

```javascript
use react-node-mongodb
```

مشاهده collections:

```javascript
show collections
```

خروج:

```javascript
exit
```

---

# 34. تست MongoDB Persistence

یک رکورد از طریق application ایجاد کن.

سپس:

```powershell
docker compose down
```

دوباره:

```powershell
docker compose up -d
```

Mongo Express را باز کن:

```text
http://localhost:8081
```

اطمینان حاصل کن که داده هنوز وجود دارد.

این نشان می‌دهد Volume درست کار می‌کند.

برای آزمایش حذف Volume:

```powershell
docker compose down -v
```

سپس:

```powershell
docker compose up -d
```

در این حالت database volume جدید ساخته می‌شود و داده قبلی دیگر وجود ندارد.

---

# 35. مشاهده Logs

همه سرویس‌ها:

```powershell
docker compose logs
```

Backend:

```powershell
docker compose logs backend
```

MongoDB:

```powershell
docker compose logs mongodb
```

Frontend:

```powershell
docker compose logs frontend
```

Mongo Express:

```powershell
docker compose logs mongo-express
```

Live logs:

```powershell
docker compose logs -f backend
```

---

# 36. بررسی Network

لیست networkها:

```powershell
docker network ls
```

سپس:

```powershell
docker network inspect <network-name>
```

باید containerهای مرتبط را مشاهده کنی:

```text
mongodb
react-node-backend
react-frontend
mongo-express
```

---

# 37. بررسی Container Environment

برای بررسی environment Backend:

```powershell
docker inspect react-node-backend --format "{{json .Config.Env}}"
```

برای Mongo Express:

```powershell
docker inspect mongo-express --format "{{json .Config.Env}}"
```

این دستور برای پیدا کردن configuration اشتباه بسیار مفید است.

---

# 38. خطای Mongo Express Unauthorized

اگر:

```text
http://localhost:8081
```

به جای UI، `Unauthorized` نشان داد، environment را بررسی کن.

ممکن است configuration متناقض باشد:

```text
ME_CONFIG_BASICAUTH_ENABLED=false
ME_CONFIG_BASICAUTH=true
```

Configuration باید یکدست باشد:

```yaml
ME_CONFIG_BASICAUTH_ENABLED: "true"
ME_CONFIG_BASICAUTH_USERNAME: admin
ME_CONFIG_BASICAUTH_PASSWORD: admin123
```

اگر container قدیمی configuration قبلی را دارد:

```powershell
docker compose up -d --force-recreate mongo-express
```

---

# 39. خطای MongoDB Connection

اگر Backend نمی‌تواند به MongoDB متصل شود:

```powershell
docker compose logs backend
```

را بررسی کن.

URI باید:

```text
mongodb://mongodb:27017/react-node-mongodb
```

باشد.

نه:

```text
mongodb://localhost:27017/react-node-mongodb
```

و نه:

```text
mongodb://host.docker.internal:27017/react-node-mongodb
```

در معماری فعلی.

---

# 40. خطای Port Binding

اگر خطایی مثل:

```text
ports are not available
```

دریافت کردی، بررسی کن:

```powershell
netstat -ano | findstr :8080
```

برای excluded ranges:

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

اگر پورت موردنظر در excluded range باشد، یک host port دیگر انتخاب کن.

مثلاً:

```yaml
ports:
  - "8080:80"
```

سمت چپ:

```text
8080
```

Host port است.

سمت راست:

```text
80
```

Container port است.

---

# 41. چرا Container Port را تغییر نمی‌دهیم؟

برای Frontend:

```text
8080:80
```

پورت `80` پورت داخلی Nginx است.

ما فقط host port را تغییر می‌دهیم:

```text
3000:80
3200:80
8080:80
```

مثلاً:

```text
8080:80
```

یعنی:

```text
Browser
   |
   | localhost:8080
   v
Host
   |
   v
Container :80
```

---

# 42. Security

در پروژه واقعی، موارد زیر نباید hardcode شوند:

```text
JWT_SECRET
Database passwords
Production credentials
```

برای development می‌توان از `.env` استفاده کرد.

مثلاً:

```env
JWT_SECRET=change-me
MONGODB_DATABASE=react-node-mongodb
```

و Compose:

```yaml
environment:
  MONGODB_URI: mongodb://mongodb:27017/${MONGODB_DATABASE}
  JWT_SECRET: ${JWT_SECRET}
```

---

# 43. .env.example

فایل:

```text
.env.example
```

می‌تواند شامل:

```env
JWT_SECRET=
MONGODB_DATABASE=react-node-mongodb
```

باشد.

فایل واقعی:

```text
.env
```

نباید commit شود.

در `.gitignore`:

```text
.env
```

قرار بده.

---

# 44. MongoDB در Production

در development می‌توانیم:

```yaml
ports:
  - "27017:27017"
```

داشته باشیم تا MongoDB از Windows قابل دسترسی باشد.

اما در production معمولاً لازم نیست MongoDB مستقیماً روی Host منتشر شود.

Backend و Mongo Express می‌توانند از طریق Docker Network به MongoDB وصل شوند.

در این حالت می‌توان mapping عمومی MongoDB را حذف کرد:

```yaml
mongodb:
  image: mongo:8.0
  volumes:
    - mongodb_data:/data/db
```

و MongoDB فقط داخل Docker Network در دسترس باشد.

---

# 45. Image و Build در Compose

در نسخه فعلی:

```yaml
backend:
  image: react-node-backend
```

و:

```yaml
frontend:
  image: react-frontend
```

یعنی Compose از imageهای موجود استفاده می‌کند.

روش دیگر:

```yaml
backend:
  build:
    context: ./server
    dockerfile: Dockerfile
```

و:

```yaml
frontend:
  build:
    context: ./client
    dockerfile: Dockerfile
```

در این روش Compose image را از source code می‌سازد.

برای پروژه حرفه‌ای می‌توان بعداً این روش را استفاده کرد تا build و orchestration در یک Compose workflow قرار بگیرند.

---

# 46. چرا فعلاً image استفاده می‌کنیم؟

در این مرحله هدف اصلی:

```text
Container
+
Network
+
Volume
+
Environment
+
Service communication
```

است.

بنابراین ابتدا imageهای موجود:

```text
react-node-backend
react-frontend
```

را به MongoDB container متصل می‌کنیم.

بعد از اینکه ارتباط کامل تأیید شد، می‌توانیم Compose را به سمت:

```text
build:
```

ببریم.

---

# 47. Full Stack Request Flow

وقتی کاربر Login می‌کند:

```text
Browser
   |
   | POST /api/auth/login
   v
React
   |
   | http://localhost:5000
   v
Backend Container
   |
   | Mongoose
   |
   | mongodb:27017
   v
MongoDB Container
```

MongoDB نتیجه را برمی‌گرداند:

```text
MongoDB
   |
   v
Backend
   |
   v
React
   |
   v
Browser
```

---

# 48. Mongo Express Flow

برای مشاهده database:

```text
Browser
   |
   | http://localhost:8081
   v
Mongo Express
   |
   | mongodb:27017
   v
MongoDB
```

Mongo Express مستقیماً از Host MongoDB استفاده نمی‌کند.

از Docker Network استفاده می‌کند.

---

# 49. Final Service Table

| Service | Image | Host Port | Container Port | Internal Hostname |
|---|---|---:|---:|---|
| Frontend | react-frontend | 8080 | 80 | frontend |
| Backend | react-node-backend | 5000 | 5000 | backend |
| MongoDB | mongo:8.0 | 27017 | 27017 | mongodb |
| Mongo Express | mongo-express:1.0.2 | 8081 | 8081 | mongo-express |

---

# 50. Final Connection Table

| Source | Destination | Address |
|---|---|---|
| Browser | Frontend | `http://localhost:8080` |
| Browser | Backend | `http://localhost:5000` |
| Browser | Mongo Express | `http://localhost:8081` |
| Backend | MongoDB | `mongodb://mongodb:27017/react-node-mongodb` |
| Mongo Express | MongoDB | `mongodb://mongodb:27017/` |

---

# 51. مهم‌ترین قواعد این پروژه

## Rule 1

Container-to-container:

```text
service-name:port
```

مثال:

```text
mongodb:27017
```

## Rule 2

Browser-to-container:

```text
localhost:published-port
```

مثال:

```text
localhost:5000
```

## Rule 3

داخل Container از localhost برای سرویس دیگر استفاده نکن.

اشتباه:

```text
mongodb://localhost:27017
```

صحیح:

```text
mongodb://mongodb:27017
```

## Rule 4

برای data persistence از Volume استفاده کن.

```text
mongodb_data:/data/db
```

## Rule 5

برای ارتباط سرویس‌ها از Docker Network استفاده کن.

```text
app-network
```

## Rule 6

`docker compose down` با `docker compose down -v` یکسان نیست.

---

# 52. دستورالعمل کامل از ابتدا تا اجرا

## Step 1 - بررسی Docker

```powershell
docker --version
docker compose version
```

## Step 2 - بررسی imageها

```powershell
docker images
```

## Step 3 - بررسی containerهای قدیمی

```powershell
docker ps -a
```

## Step 4 - اگر containerهای قبلی conflict ایجاد می‌کنند

```powershell
docker stop react-node-backend react-frontend mongodb
```

سپس:

```powershell
docker rm react-node-backend react-frontend mongodb
```

در صورت وجود containerهای قدیمی Mongo Express نیز:

```powershell
docker stop mongo-express
docker rm mongo-express
```

## Step 5 - بررسی Compose file

```text
docker-compose.yml
```

را در root پروژه قرار بده.

## Step 6 - Start

```powershell
docker compose up -d
```

## Step 7 - Check

```powershell
docker compose ps
```

## Step 8 - Logs

```powershell
docker compose logs
```

## Step 9 - Test Frontend

```text
http://localhost:8080
```

## Step 10 - Test Backend

```text
http://localhost:5000
```

یا:

```text
http://localhost:5000/health
```

## Step 11 - Test Mongo Express

```text
http://localhost:8081
```

Credentials:

```text
Username: admin
Password: admin123
```

## Step 12 - Test MongoDB

```powershell
docker exec -it mongodb mongosh
```

---

# 53. Cleanup

برای توقف معمولی:

```powershell
docker compose down
```

برای حذف کامل همراه Volume:

```powershell
docker compose down -v
```

برای مشاهده resources:

```powershell
docker ps
docker images
docker network ls
docker volume ls
```

---

# 54. Troubleshooting Flow

اگر مشکل داشتیم، به صورت تصادفی فایل‌ها را تغییر نده.

این ترتیب را دنبال کن:

```text
1. docker compose ps
        ↓
2. docker compose logs
        ↓
3. Check port
        ↓
4. Check network
        ↓
5. Check environment
        ↓
6. Check MongoDB
        ↓
7. Check Backend
        ↓
8. Check Frontend
```

مثلاً مشکل Backend:

```powershell
docker compose logs backend
```

مشکل MongoDB:

```powershell
docker compose logs mongodb
```

مشکل Mongo Express:

```powershell
docker compose logs mongo-express
```

---

# 55. Architecture Checklist

Before considering this stage complete, verify:

- [ ] React container is running.
- [ ] Backend container is running.
- [ ] MongoDB container is running.
- [ ] Mongo Express container is running.
- [ ] All required containers are on `app-network`.
- [ ] Backend uses `mongodb:27017`.
- [ ] Backend does not use `localhost` for MongoDB.
- [ ] Backend does not use `host.docker.internal` for containerized MongoDB.
- [ ] MongoDB has a named volume.
- [ ] MongoDB data survives `docker compose down`.
- [ ] Frontend is reachable through `localhost:8080`.
- [ ] Backend is reachable through `localhost:5000`.
- [ ] Mongo Express is reachable through `localhost:8081`.
- [ ] Mongo Express can connect to MongoDB.
- [ ] Login/Signup API works.
- [ ] MongoDB contains application data.
- [ ] `.env` is not committed.

---

# 56. Professional Improvements After This Stage

بعد از اینکه این configuration کاملاً کار کرد، مراحل بعدی می‌توانند شامل این موارد باشند:

1. انتقال secrets به `.env`.
2. ایجاد `.env.example`.
3. استفاده از `build:` در Compose.
4. اضافه کردن `.dockerignore`.
5. اضافه کردن MongoDB healthcheck.
6. استفاده صحیح از `depends_on` با health conditions.
7. بهینه‌سازی Dockerfileهای Backend و Frontend.
8. Multi-stage build برای React.
9. محدود کردن exposure پورت MongoDB در production.
10. اضافه کردن centralized logging.
11. اضافه کردن health endpoint برای Backend.
12. مستندسازی کامل در `README.md`.

---

# 57. Golden Rule

اصل اصلی پروژه:

```text
First make the application work.
Then make it portable.
```

Application Architecture:

```text
React
   ↓
Node.js / Express
   ↓
MongoDB
```

Container Architecture:

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

Docker نباید business logic برنامه را تغییر دهد.

Docker فقط نحوه اجرای application را مدیریت می‌کند.

---

# 58. Final Result

در پایان این مرحله باید داشته باشیم:

```text
                         Browser
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
    localhost:8080    localhost:5000   localhost:8081
          |                 |                 |
          v                 v                 v
     React/Nginx        Node/Express     Mongo Express
                              |                 |
                              |                 |
                              +--------+--------+
                                       |
                                       v
                                Docker Network
                                       |
                                       v
                                  MongoDB
                                       |
                                       v
                                mongodb_data
                                   Volume
```

این setup نشان می‌دهد که:

- React در container اجرا می‌شود.
- Node.js در container اجرا می‌شود.
- MongoDB در container اجرا می‌شود.
- Backend با Docker DNS به MongoDB متصل می‌شود.
- MongoDB data با Volume پایدار می‌ماند.
- Mongo Express برای مدیریت MongoDB از Browser استفاده می‌شود.
- Docker Compose کل infrastructure را مدیریت می‌کند.

این پایه مناسب برای ادامه Dockerization حرفه‌ای پروژه است.
