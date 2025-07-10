const express = require("express");
const router = express.Router();

const cartRoutes = require("./cart.api.routes");
const productRoutes = require("./product.api.routes");

router.use("/cart", cartRoutes);
router.use("/product", productRoutes);

module.exports = router;
