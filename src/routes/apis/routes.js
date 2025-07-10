const express = require("express");
const router = express.Router();

const commerceRoutes = require("./commerce/routes");
const securityRoutes = require("./security/routes");
const shopRoutes = require("./shop/routes");
const dashboardRoutes = require("./dashboard/routes");

router.use("/commerce", commerceRoutes);
router.use("/security", securityRoutes);
router.use("/shop", shopRoutes);
router.use("/", dashboardRoutes);

module.exports = router;
