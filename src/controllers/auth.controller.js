const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { jwtSecret } = require("../configs/env.config");
const AppError = require("../utilities/appError"); // You'll need to create this

// Helper functions
const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  user.password = undefined;

  // For API responses
  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      status: "success",
      token,
      data: { user },
    });
  }

  // For server-side rendered views
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).redirect("/dashboard");
};

// Error handling middleware
const handleAuthError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // API error handling
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // View error handling with redirects
  const errorMessages = {
    "User with that email or username already exists":
      "/signup?error=user_exists",
    "Incorrect username or password": "/login?error=auth_failed",
    "You are not logged in": "/login?error=unauthorized",
    "User recently changed password": "/login?error=password_changed",
  };

  const redirectUrl = errorMessages[err.message] || "/error";
  req.flash("error", err.message); // Requires express-flash
  res.redirect(redirectUrl);
};

exports.signupView = (req, res) => {
  res.render("auth/signup", {
    layout: "_layouts/_layout",
    title: "Create Account",
    errors: req.flash("errors"),
    formData: req.flash("formData")[0] || {},
  });
};

// Signup Controller
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    // Validate input
    if (password !== passwordConfirm) {
      req.flash("error", "Passwords do not match");
      req.flash("formData", { username, email });
      return res.redirect("/signup");
    }
    console.log("Password :", password);
    // Create user with hashed password
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("HashedPassword :", hashedPassword);
    const newUser = await User.create({
      username,
      email,
      password: password,
    });

    console.log("New user created successfully:", {
      username: newUser.username,
      email: newUser.email,
    });

    // Auto-login after signup
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.error("Signup error:", err);

    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      req.flash("error", `${field} already exists`);
      req.flash("formData", {
        username: req.body.username,
        email: req.body.email,
      });
      return res.redirect("/signup");
    }

    req.flash("error", "Something went wrong during signup");
    res.redirect("/signup");
  }
};

exports.loginView = async (req, res, next) => {
  res.render("auth/login", {
    layout: "_layouts/_layout",
    error: req.query.error,
  });
};

// login controller
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
      req.flash("error", "Please provide username and password");
      return res.redirect("/login");
    }

    // 2) Find user with password
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      req.flash("error", "Incorrect username or password");
      return res.redirect("/login");
    }

    console.log("=========>< user.password : ", user.password);
    console.log("=========>< password : ", password);

    // 3) Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      req.flash("error", "Incorrect username or password");
      return res.redirect("/login");
    }

    // 4) Successful login
    createSendToken(user, 200, req, res);
  } catch (err) {
    console.error("Login error:", err);
    req.flash("error", "An error occurred during login");
    res.redirect("/login");
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, jwtSecret);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser; // For views
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.redirect("/login");
};

// auth.controller.js
exports.isLoggedIn = async (req, res, next) => {
  try {
    console.log("Cookie =>>>>>>>>>>>>", req.cookies.jwt);
    if (req.cookies.jwt) {
      // 1) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        res.locals.isLoggedIn = false;
        return next();
      }

      // 3) There is a logged in user
      res.locals.role = currentUser.role;
      res.locals.isLoggedIn = true;
      res.locals.username = currentUser.username.toUpperCase();

      req.user = currentUser;
      return next();
    }
    res.locals.isLoggedIn = false;
    res.locals.role = "";
    res.locals.username = "";
    next();
  } catch (err) {
    res.locals.isLoggedIn = false;
    next();
  }
};

// Error handling middleware (add this at the end of your middleware stack)
exports.errorHandler = handleAuthError;
