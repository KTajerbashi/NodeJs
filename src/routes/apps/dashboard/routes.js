const express = require("express");
const router = express.Router();

router.use("/", require("./calendar.routes"));
router.use("/", require("./event.routes"));
router.use("/", require("./dashbaord.routes"));

module.exports = router;
