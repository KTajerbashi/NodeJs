const express = require("express");
const router = express.Router();

const controller = require("../../controllers/layout.controller");

router.get("/dashboard", controller.dashboard);
router.get("/profile", controller.profile);
router.get("/about", controller.about);

// For testing purposes only - remove in production
router.get("/test-404", (req, res) => {
  res.status(404).render("common/404", {
    title: "Test 404 Page",
    layout: "_layouts/main",
  });
});

router.get("/", controller.index);

// After all your other routes
router.use((req, res, next) => {
  res.status(404).render("common/404", {
    title: "Page Not Found",
    attemptedUrl: "/",
    layout: "_layouts/main", // Use your main layout
  });
});
module.exports = router;
