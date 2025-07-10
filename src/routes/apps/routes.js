const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

router.get("/commerce", require("./commerce/routes"));
router.get("/security", require("./security/routes"));
router.get("/shop", require("./shop/routes"));
router.get("/", require("./dashboard/routes"));

module.exports = router;
