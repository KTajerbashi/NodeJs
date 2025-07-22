const express = require("express");
const router = express.Router();

const controller = require("../../controllers/system.controller");

router.get("/system", controller.index);

module.exports = router;
