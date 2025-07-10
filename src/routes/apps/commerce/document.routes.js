const express = require("express");
const router = express.Router();

const dashboardController = require("../../../usecases/dashboard/controllers/dashboard.controller");

router.get("/", dashboardController.documents);

module.exports = router;
