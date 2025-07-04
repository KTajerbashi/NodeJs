const express = require("express");

const router = express.Router();

router.get("/products", (req, res, next) => {
  res.json({
    message: "Products Routes",
  });
});
router.post("/product", (req, res, next) => {
  res.json({
    message: "Product Create",
  });
});

router.get("/product/:id", (req, res, next) => {
  console.log("Req : ");
  res.json({
    message: `Read Product Id : ${req.params.id}`,
  });
});

module.exports = router;
