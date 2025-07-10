const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/commerce/controllers/project/project.controller");

router.get("/", controller.projects);

module.exports = router;
