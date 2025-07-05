const express = require("express");
const router = express.Router();

//  Require Routes
const mainRoutes = require("./main.routes");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

//  Add Routes to Application
router.use("/api/product/", productRoutes);
router.use("/api/user/", userRoutes);
router.use("/api/auth/", authRoutes);
router.use("/", mainRoutes);

module.exports = router;
