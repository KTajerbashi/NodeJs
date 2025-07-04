// controllers/userController.js
const User = require("../models/user_model");

exports.getUsers = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login_view");
  }

  try {
    const users = await User.find().select("name email");
    res.render("users", {
      users,
      currentUser: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading users");
  }
};
