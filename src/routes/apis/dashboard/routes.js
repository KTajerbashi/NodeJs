const express = require("express");
const router = express.Router();

const eventRoutes = require("./event.api.routes");
const dashboardRoutes = require("./dashboard.api.routes");

router.use("/event", eventRoutes);
router.use("/", dashboardRoutes);

module.exports = router;
