//  Require Dependencies
const express = require("express");

//  Require Routes
const mainRoutes = require("./routes/main.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

//  Startup Configuration
const app = express();

app.use(express.json());

//  Add Routes to Application
app.use("/api/product/", productRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/", mainRoutes);

//  Run Application
app.listen(8000);
