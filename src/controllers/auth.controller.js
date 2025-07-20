const {
  validator,
  bcrypt,
  jwt,
  promisify,
  crypto,
  nodemailer,
} = require("../global.using");
const User = require("../models/user.model");
const { jwtSecret } = require("../configs/env.config");
const AppError = require("../utilities/appError");

class AuthController {
  // ======================
  // VIEW CONTROLLERS
  // ======================
  static renderLoginView(req, res) {
    res.render("auth/login", {
      layout: "_layouts/_layout",
      error: req.query.error,
    });
  }

  static renderSignupView(req, res) {
    res.render("auth/signup", {
      layout: "_layouts/_layout",
      title: "Create Account",
      errors: req.flash("errors"),
      formData: req.flash("formData")[0] || {},
    });
  }

  static renderForgotPasswordView(req, res) {
    res.render("auth/forgotPassword", {
      title: "Forgot Password",
      layout: "_layouts/_layout",
      messages: req.flash(),
    });
  }

  static async renderResetPasswordView(req, res) {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired");
        return res.redirect("/forgot-password");
      }

      res.render("auth/resetPassword", {
        title: "Reset Password",
        token: req.params.token,
        messages: req.flash(),
        layout: "_layouts/_layout",
      });
    } catch (error) {
      console.error("Reset password view error:", error);
      req.flash("error", "Error processing your request");
      res.redirect("/forgot-password");
    }
  }

  // ======================
  // AUTH UTILITIES
  // ======================
  static signToken(id) {
    return jwt.sign({ id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  }

  static createSendToken(user, statusCode, req, res) {
    const token = AuthController.signToken(user._id);
    user.password = undefined;

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          (process.env.JWT_COOKIE_EXPIRES_IN || 30) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    };

    res.cookie("jwt", token, cookieOptions);

    if (req.originalUrl.startsWith("/api")) {
      return res.status(statusCode).json({
        status: "success",
        token,
        data: { user },
      });
    }

    res.status(statusCode).redirect("/dashboard");
  }

  // ======================
  // AUTH OPERATIONS
  // ======================
  static async signup(req, res) {
    try {
      const { username, email, password, passwordConfirm } = req.body;

      if (password !== passwordConfirm) {
        req.flash("error", "Passwords do not match");
        req.flash("formData", { username, email });
        return res.redirect("/signup");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      AuthController.createSendToken(newUser, 201, req, res);
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        req.flash("error", `${field} already exists`);
        req.flash("formData", {
          username: req.body.username,
          email: req.body.email,
        });
        return res.redirect("/signup");
      }

      console.error("Signup error:", error);
      req.flash("error", "Something went wrong during signup");
      res.redirect("/signup");
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        req.flash("error", "Please provide username and password");
        return res.redirect("/login");
      }

      const user = await User.findOne({ username }).select("+password");

      if (!user || !(await bcrypt.compare(password, user.password))) {
        req.flash("error", "Incorrect username or password");
        return res.redirect("/login");
      }

      AuthController.createSendToken(user, 200, req, res);
    } catch (error) {
      console.error("Login error:", error);
      req.flash("error", "An error occurred during login");
      res.redirect("/login");
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        req.flash("error", "No account with that email exists");
        return res.redirect("/forgot-password");
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      await user.save({ validateBeforeSave: false });

      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/reset-password/${resetToken}`;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: "Your password reset token (valid for 10 min)",
        html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
      });

      req.flash("success", "Password reset link sent to your email");
      res.redirect("/forgot-password");
    } catch (error) {
      console.error("Forgot password error:", error);
      req.flash("error", "Error sending password reset email");
      res.redirect("/forgot-password");
    }
  }

  static async resetPassword(req, res) {
    try {
      const { password, passwordConfirm } = req.body;
      const token = req.params.token;

      if (password !== passwordConfirm) {
        req.flash("error", "Passwords do not match");
        return res.redirect(`/reset-password/${token}`);
      }

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        req.flash("error", "Token is invalid or has expired");
        return res.redirect("/forgot-password");
      }

      user.password = await bcrypt.hash(password, 12);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.passwordChangedAt = Date.now();
      await user.save();

      AuthController.createSendToken(user, 200, req, res);
    } catch (error) {
      console.error("Reset password error:", error);
      req.flash("error", "Error resetting your password");
      res.redirect(`/reset-password/${req.params.token}`);
    }
  }

  static logout(req, res) {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.redirect("/login");
  }

  // ======================
  // MIDDLEWARE
  // ======================
  static async protect(req, res, next) {
    try {
      let token;
      if (req.cookies.jwt) {
        token = req.cookies.jwt;
      } else if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(
          new AppError(
            "You are not logged in! Please log in to get access.",
            401
          )
        );
      }

      const decoded = await promisify(jwt.verify)(token, jwtSecret);
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token no longer exists.",
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
      res.locals.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  }

  static restrictTo(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
      next();
    };
  }

  static async isLoggedIn(req, res, next) {
    try {
      res.locals.auth = {
        role: "",
        isLoggedIn: false,
        username: "",
        user: undefined,
      };

      if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtSecret);
        const currentUser = await User.findById(decoded.id);
        if (currentUser) {
          res.locals.auth = {
            role: currentUser.role,
            isLoggedIn: true,
            username: currentUser.username.toUpperCase(),
            user: currentUser,
          };
          req.user = currentUser;
        }
      }
      console.log("❌ LOCAL : =>>>>>> ", res.locals.auth);
      next();
    } catch (error) {
      next();
    }
  }

  static errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (req.originalUrl.startsWith("/api")) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    const errorRedirects = {
      "User with that email or username already exists":
        "/signup?error=user_exists",
      "Incorrect username or password": "/login?error=auth_failed",
      "You are not logged in": "/login?error=unauthorized",
      "User recently changed password": "/login?error=password_changed",
    };

    req.flash("error", err.message);
    res.redirect(errorRedirects[err.message] || "/error");
  }
}

module.exports = AuthController;
