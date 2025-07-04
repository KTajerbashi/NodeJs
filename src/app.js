const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./data/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/nodeapp",
      collectionName: "sessions",
    }),
  })
);

const securityPath = path.join(__dirname, "views", "security");
const layoutPath = path.join(__dirname, "views", "layout");
const solutionPath = path.join(__dirname, "views", "solution");
const authPath = path.join(__dirname, "views", "auth");
const viewsPath = path.join(__dirname, "views");
app.set("views", [viewsPath, authPath, layoutPath, securityPath]);
// app.set("views", layoutPath);
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);
app.use("/users", userRoutes);

// Server
app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
