//  Require Dependencies
const express = require("express");
const mongoose = require("mongoose");

//  Require Root Routes
const rootRequire = require("./routes/root.routes");

//  Startup Configuration
const app = express();

//  Config api
app.use(express.json());

//  Add Routes
app.use(rootRequire);

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
