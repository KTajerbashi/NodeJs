const express = require("express");

const router = express.Router();

router.get("/dashboard", (req, res, next) => {
  res.json({
    message: "Post Routes",
  });
});
router.get("/", (req, res, next) => {
  res.redirect("/dashboard");
});

module.exports = router;
