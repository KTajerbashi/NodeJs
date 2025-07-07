const express = require("express");
const router = express.Router();

const dashboardController = require("../../usecases/dashboard/controllers/dashboard.controller");

router.get("/dashboard", dashboardController.dashboard);
router.get("/projects", dashboardController.projects);
router.get("/calendar", dashboardController.calendar);
router.get("/documents", dashboardController.documents);
router.get("/", dashboardController.index);

module.exports = router;
