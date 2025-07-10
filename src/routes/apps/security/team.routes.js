const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/security/controllers/user/user.controller");

router.get("/team", controller.team);

module.exports = router;
