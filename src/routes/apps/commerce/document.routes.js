const express = require("express");
const router = express.Router();

const controller = require("../../../usecases/commerce/controllers/document/document.controller");

router.get("/documents", controller.index);

module.exports = router;
