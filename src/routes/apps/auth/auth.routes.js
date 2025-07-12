const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/auth/controllers/auth.controller");

router.get("/login", controller.login);
router.get("/signin", controller.signin);

module.exports = router;
