const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/dashboard/controllers/calendar.controller");

router.get("/calendar", controller.index);

module.exports = router;
