const ProductModel = require("../models/product.model");

const products = async (req, res, next) => {
  try {
    const products = await ProductModel.ProductModel.find();
    res.render("shop/products_view", {
      title: "Shop",
      content: "This goes in the body",
      products: products ?? [],
      styles: ["./product.style.css"],
    });
  } catch (err) {
    console.error("Shop error:", err);
    res.status(500).render("error", {
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  }
};

module.exports = {
  products,
};
