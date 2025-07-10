const express = require("express");
const router = express.Router();

router.get("/user", require("./user.routes"));
router.get("/role", require("./role.routes"));
router.get("/team", require("./team.routes"));

module.exports = router;
