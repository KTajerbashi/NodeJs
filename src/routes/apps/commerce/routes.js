const express = require("express");
const router = express.Router();

router.get("/document", require("./document.routes"));
router.get("/project", require("./project.routes"));

module.exports = router;
