const { ApiResponse, uuidv4 } = require("../common/global.using");
const { ProductModel } = require("../models/product.model");

// ✅ Create
const createProduct = async (req, res) => {
  const { title, description, price, rate } = req.body;

  if (!title || !description || !price || !rate) {
    return res.status(400).json(ApiResponse.BadRequest("Model is invalid."));
  }

  const model = new ProductModel({ title, description, price, rate });
  await model.save();

  return res.status(201).json(ApiResponse.Success(model));
};

// ✅ Get All
const getProducts = async (req, res) => {
  const response = await ProductModel.find();

  return res.status(200).json(ApiResponse.Success(response));
};

// ✅ Get By Id
const getByIdProduct = async (req, res) => {
  const id = req.params.id;
  const response = await ProductModel.findById(id);

  if (!response) {
    return res
      .status(404)
      .json(ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }

  return res.status(200).json(ApiResponse.Success(response));
};

// ✅ Delete
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const record = await ProductModel.findByIdAndDelete(id);

  if (record === null) {
    return res
      .status(404)
      .json(ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }

  return res
    .status(200)
    .json(ApiResponse.Success(`Deleted product ID: ${id}`, record));
};

// ✅ Update
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, description, price, rate } = req.body;

  const product = await ProductModel.findByIdAndUpdate(
    id,
    { title, description, price, rate },
    { new: true }
  );

  if (!product) {
    return res
      .status(404)
      .json(ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }
  return res.status(200).json(ApiResponse.Success(product));
};

module.exports = {
  createProduct,
  getProducts,
  getByIdProduct,
  deleteProduct,
  updateProduct,
};
