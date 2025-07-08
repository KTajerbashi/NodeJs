const express = require("express");
const router = express.Router();

const productControllers = require("../../../usecases/shop/controllers/product.controller");

router.get("/products", productControllers.products);

module.exports = router;
