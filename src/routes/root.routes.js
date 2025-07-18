const express = require("express");
const router = express.Router();
const controller = require("../controllers/layout.controller");
router.use(require("./auth.routes"));

router.get("/", controller.index);
router.get("/dashboard", controller.dashboard);
router.get("/profile", controller.profile);

module.exports = router;
