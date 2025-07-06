const express = require("express");
const router = express.Router();
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");

//  Pages
//  Security
const securityRoutes = require("./pages/security.routes");
router.use("/security", securityRoutes);

//  Shop
const shopRoutes = require("./pages/shop.routes");
router.use("/shop", shopRoutes);

//  Dashboard
const dashboarRoutes = require("./pages/dashbaord.routes");
router.use("/", dashboarRoutes);

router.use(authMiddleware);

//  Apis
//  Security
const apiRoutes = require("./apis/routes");
router.use("/api", apiRoutes);

// 🔴 404 Handler (must come after all other routes)
router.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "../views", "common", "404.html"));
});

module.exports = router;
