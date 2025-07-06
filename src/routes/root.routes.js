const express = require("express");
const router = express.Router();

//  Require Routes
const mainRoutes = require("./main.routes");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const authMiddleware = require("../middlewares/auth.middleware");

//  Add Routes to Application
router.use("/api/auth/", authRoutes);

router.use(authMiddleware); //  After this all Api Check Token Validation

router.use("/api/product/", productRoutes);
router.use("/api/user/", userRoutes);
router.use("/", mainRoutes);

module.exports = router;
