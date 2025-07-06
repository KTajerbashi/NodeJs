const products = async (req, res, next) => {
  try {
    res.render("shop/products_view", {
      title: "Shop",
      content: "This goes in the body",
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
