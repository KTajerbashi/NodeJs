const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");

router.get("/signup", authController.signupView);
router.post("/signup", authController.signup);

router.get("/login", authController.loginView);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Protected route example
router.get("/is-auth", authController.protect, async (req, res) => {
  const username = "tajerbashi"; // replace with your actual username
  const newPassword = "123123123";
  const hash = await bcrypt.hash(newPassword, 12);

  const isPasswordCorrect = await bcrypt.compare(password, hash);
  console.log("Comparison result:", isPasswordCorrect);

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

router.get("/test", async (req, res) => {
  const username = "tajerbashi"; // replace with your actual username
  const password = "123123123";
  const hash = await bcrypt.hash(password, 12);

  const isPasswordCorrect = await bcrypt.compare(password, hash);

  console.log("Comparison result:", isPasswordCorrect);

  res.status(200).json({
    status: "success",
    data: {
      isPasswordCorrect: isPasswordCorrect,
      hash: hash,
    },
  });
});

router.get("/test-bcrypt", async (req, res) => {
  const password = "123123123";
  const hash = "$2b$12$hhsOef93Ga4krzgTGtUbuOjeCbkyCCuUVjg2MAStYVyMkSpSEbZXa";
  const match = await bcrypt.compare(password, hash);

  res.json({
    password,
    hash,
    match, // Should be true
    algorithm: hash.substring(0, 3), // Should be $2a$ or $2b$
  });
});

module.exports = router;
