const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");
const mainController = require("../controllers/main.controller");

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getByIdProduct);
router.post("/product", productController.createProduct);
router.delete("/product/:id", productController.deleteProduct);
router.put("/product/:id", productController.updateProduct);

module.exports = router;
