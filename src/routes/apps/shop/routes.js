const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

router.use(require("./shop.routes"));

module.exports = router;
