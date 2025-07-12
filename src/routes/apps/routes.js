const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

router.use(require("./auth/routes"));
router.use(require("./commerce/routes"));
router.use(require("./security/routes"));
router.use(require("./shop/routes"));
router.use(require("./dashboard/routes"));

module.exports = router;
