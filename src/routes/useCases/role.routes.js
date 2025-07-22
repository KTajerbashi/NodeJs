const express = require("express");
const router = express.Router();

const controller = require("../../controllers/role.controller");
router.get("/roles", controller.index);

module.exports = router;
