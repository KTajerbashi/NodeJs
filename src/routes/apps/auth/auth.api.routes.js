const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const controller = require("../../../usecases/auth/controllers/auth.api.controller");

router.post("/login", controller.login);

module.exports = router;
