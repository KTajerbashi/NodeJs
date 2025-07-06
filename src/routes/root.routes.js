const express = require("express");
const router = express.Router();
const path = require("path");
const securityRoutes = require("./security.routes");
const shopRoutes = require("./shop.routes");
const authMiddleware = require("../middlewares/auth.middleware");
const mainRoutes = require("./main.routes");

router.use(authMiddleware);
router.use("/security", securityRoutes);
router.use("/shop", shopRoutes);
router.use("/", mainRoutes);

// 🔴 404 Handler (must come after all other routes)
router.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "../views", "common", "404.html"));
});

module.exports = router;
