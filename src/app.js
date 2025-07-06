require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const routes = require("./routes/root.routes");
const path = require("path");
module.exports = class Application {
  constructor() {
    this.startup();
  }

  static startup() {
    const app = express();

    app.use(expressLayouts);

    // Configure view engine
    app.set("views", [
      path.join(__dirname, "views"), // Main views directory
      path.join(__dirname, "usecases/dashboard/views"), // Dashboard-specific views
    ]);
    // Configure Express to use EJS layouts
    app.set("view engine", "ejs"); // Set EJS as template engine
    app.set("layout", "./_layout"); // Specify your layout file

    app.use(express.static(path.join(__dirname, "../public")));

    //  Config api
    app.use(express.json());

    app.use(routes);

    return app;
  }
};
