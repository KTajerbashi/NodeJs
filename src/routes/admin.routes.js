const express = require("express");
const router = express.Router();
const path = require("path");
router.use("/dashboard", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "dasboard.view.html"));
});
router.get("/user", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "user.view.html"));
});

router.post("/user", (req, res, next) => {
  console.log("User Added : ", req.body);
  res.redirect("/admin/dashboard");
});

module.exports = router;
