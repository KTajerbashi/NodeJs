// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.get("/profile", authController.getProfile);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

// Home page (GET /)
router.get("/", (req, res) => {
  res.render("index_layout"); // You can also use 'index' or whatever your EJS file is
});

module.exports = router;
