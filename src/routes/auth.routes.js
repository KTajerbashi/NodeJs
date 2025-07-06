const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/is-authenticated", authController.isAuthenticated);
router.post("/is-authorize", authController.isAuthorize);
router.post("/is-valid-token", authController.isValidToken);

module.exports = router;
