const express = require("express");
const router = express.Router();

router.use(require("./user.routes"));
router.use(require("./role.routes"));
router.use(require("./team.routes"));

module.exports = router;
