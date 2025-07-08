const express = require("express");
const router = express.Router();

const securityRoutes = require("./security/root.routes");
const shopRoutes = require("./shop/root.routes");
const dashboardRoutes = require("./shop/root.routes");

router.use("/security", securityRoutes);
router.use("/shop", shopRoutes);

module.exports = router;
