// controllers/authController.js
const User = require("../models/user_model");

exports.getSignup = (req, res) => {
  res.render("signup_view", { error: null });
};

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup_view", { error: "Email already registered." });
    }

    const user = new User({ name, email, password });
    await user.save();

    req.session.user = user;
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.render("signup_view", { error: "Something went wrong." });
  }
};

exports.getLogin = (req, res) => {
  res.render("login_view", { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.render("login_view", { error: "Invalid email or password." });
    }

    req.session.user = user;
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.render("login_view", { error: "Something went wrong." });
  }
};

exports.getProfile = (req, res) => {
  res.render("profile_view", { error: null });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
