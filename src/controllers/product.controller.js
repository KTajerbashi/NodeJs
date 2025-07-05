const Models = require("../common/common.models");

let products = []; // Simulated in-memory database

const createProduct = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json(
        Models.ApiResponse.BadRequest("Title and description are required.")
      );
  }

  const newProduct = {
    id: Math.floor(Math.random() * 100000),
    title,
    description,
  };

  products.push(newProduct);

  return res.status(201).json(Models.ApiResponse.Success(newProduct));
};

const getProducts = (req, res) => {
  return res.status(200).json(Models.ApiResponse.Success(products));
};

const getByIdProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res
      .status(404)
      .json(Models.ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }

  return res.status(200).json(Models.ApiResponse.Success(product));
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res
      .status(404)
      .json(Models.ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }

  const deletedProduct = products.splice(productIndex, 1);

  return res
    .status(200)
    .json(
      Models.ApiResponse.Success(`Deleted product ID: ${id}`, deletedProduct)
    );
};

const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res
      .status(404)
      .json(Models.ApiResponse.NotFound(`Product with ID ${id} not found.`));
  }

  if (title) product.title = title;
  if (description) product.description = description;

  return res.status(200).json(Models.ApiResponse.Success(product));
};

module.exports = {
  createProduct,
  getProducts,
  getByIdProduct,
  deleteProduct,
  updateProduct,
};
