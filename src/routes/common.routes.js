const express = require("express");
const router = express.Router();

// After all your other routes
router.use((req, res, next) => {
  res.status(404).render("common/404", {
    title: "Page Not Found",
    attemptedUrl: "/",
    layout: "_layouts/main", // Use your main layout
  });
});
// For testing purposes only - remove in production
router.get("/test-404", (req, res) => {
  res.status(404).render("common/404", {
    title: "Test 404 Page",
    layout: "_layouts/main",
  });
});
router.use("/", (req, res, next) => {
  res.json({
    message: "Dashbaord",
  });
});

module.exports = router;
