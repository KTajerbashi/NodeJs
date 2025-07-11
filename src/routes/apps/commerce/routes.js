const express = require("express");
const router = express.Router();

router.use(require("./document.routes"));
router.use(require("./project.routes"));

module.exports = router;
