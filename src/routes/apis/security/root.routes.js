const express = require("express");
const router = express.Router();

const userRoutes = require("./user.api.routes");
const roleRoutes = require("./role.api.routes");

router.use("/user", userRoutes);
router.use("/role", roleRoutes);

module.exports = router;
