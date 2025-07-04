//  Require Dependencies
const express = require("express");

//  Require Routes
const mainRoutes = require("./routes/main.routes");
const productRoutes = require("./routes/product.routes");

//  Startup Configuration
const app = express();

app.use(express.json());

//  Add Routes to Application
app.use("/api", productRoutes);
app.use("/", mainRoutes);

//  Run Application
app.listen(8000);
