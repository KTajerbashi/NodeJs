const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { jwtSecret } = require("../configs/env.config");
const AppError = require("../utilities/appError"); // You'll need to create this

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
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

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
exports.signupView = async (req, res, next) => {
  res.render("auth/signup", {
    layout: "_layouts/_layout",
    error: req.query.error,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(
        new AppError("User with that email or username already exists", 400)
      );
    }

    const newUser = await User.create({ username, email, password });
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    next(err);
  }
};
exports.loginView = async (req, res, next) => {
  res.render("auth/login", {
    layout: "_layouts/_layout",
    error: req.query.error,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password, remember } = req.body;

    if (!username || !password) {
      req.flash("error", "Please provide username and password");
      return res.redirect("/login");
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      req.flash("error", "Incorrect username or password");
      return res.redirect("/login");
    }

    createSendToken(user, 200, req, res);
  } catch (err) {
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

// Error handling middleware (add this at the end of your middleware stack)
exports.errorHandler = handleAuthError;
