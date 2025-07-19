const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

module.exports = class MiddlewarePipes {
  static configuration(app) {
    // Middleware
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
  }
};
