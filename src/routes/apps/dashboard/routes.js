const express = require("express");
const router = express.Router();

router.use("/calendar", require("./calendar.routes"));
router.use("/event", require("./event.routes"));
router.use("/", require("./dashbaord.routes"));

module.exports = router;
