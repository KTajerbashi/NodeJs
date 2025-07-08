const express = require("express");
const router = express.Router();

const eventRoutes = require("./event.api.routes");

router.use("/event", eventRoutes);

module.exports = router;
