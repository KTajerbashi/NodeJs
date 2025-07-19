const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
console.log("=====");
console.log(path.join(__dirname, "../../public"));
console.log(path.join(__dirname, "../views"));
console.log("=====");
module.exports = class ViewConfiguration {
  static handler = (app) => {
    app.use(expressLayouts);
    app.use(express.static(path.join(__dirname, "../../public")));
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../views"));
    app.set("layout", "_layouts/main"); // Default layout
    // This enables the contentFor and defineContent functionality
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);
  };
};
