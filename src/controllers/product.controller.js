const createProduct = (req, res, next) => {
  const parameter = req.body;
  console.log("Parameter : ", parameter);
  res.json({
    message: "Product Create",
  });
};

const getProducts = (req, res, next) => {
  res.json({
    message: "Products Routes",
  });
};

const getByIdProduct = (req, res, next) => {
  res.json({
    message: `Read Product Id : ${req.params.id}`,
  });
};

const deleteProduct = (req, res, next) => {
  res.json({
    message: `Deleted Product Id : ${req.params.id}`,
  });
};

const updateProduct = (req, res, next) => {
  res.json({
    message: `Read and Update Product Id : ${req.params.id}`,
  });
};

exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProducts = getProducts;
exports.getByIdProduct = getByIdProduct;
