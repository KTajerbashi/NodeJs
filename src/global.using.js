const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { promisify } = require("util");

const router = express.Router();

module.exports = {
  validator,
  bcrypt,
  jwt,
  promisify,
  crypto,
  nodemailer,
  mongoose,
  express,
  expressLayouts,
  path,
  router,
  session,
  cookieParser,
  flash,
  morgan,
  helmet,
  cors,
};
