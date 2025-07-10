const express = require("express");
const router = express.Router();
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");

// //  Security
// router.use("/security", require("./apps/security/routes"));

// //  Shop
// router.use("/shop", require("./apps/shop/shop.routes"));

// //  Dashboard
// router.use("/api", require("./apis/dashboard/routes"));
// router.use("/", require("./apps/dashboard/dashbaord.routes"));

// router.use(authMiddleware);

//  Apis
router.use("/api", require("./apis/routes"));
//  Apps
router.use("/", require("./apps/routes"));

// 🔴 404 Handler (must come after all other routes)
router.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "../views", "common", "404.html"));
});

module.exports = router;
