const express = require("express");
const router = express.Router();

const userController = require("../../../usecases/security/controllers/user/user.controller");

router.get("/users", userController.users);

module.exports = router;
