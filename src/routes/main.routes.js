const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main.controller");

router.get("/dashboard", mainController.dashboard);
router.get("/", mainController.index);

module.exports = router;
