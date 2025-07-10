const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/dashboard/controllers/dashboard.controller");

router.get("/", controller.calendar);

module.exports = router;
