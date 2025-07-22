const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user.controller");

router.get("/users", controller.index);

module.exports = router;
