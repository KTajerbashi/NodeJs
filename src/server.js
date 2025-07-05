//  Require Dependencies
const express = require("express");
const mongoose = require("mongoose");

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
mongoose
  .connect("mongodb://127.0.0.1:27017/nodeapp")
  .then(() => {
    app.listen(8000);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Finally ");
  });
