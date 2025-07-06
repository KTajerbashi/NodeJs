const express = require("express");
const router = express.Router();

const homeController = require("../usecases/dashboard/controllers/home.controller");

router.get("/dashboard", homeController.loadDashboard);
router.get("/", homeController.index);

module.exports = router;
