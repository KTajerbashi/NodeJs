const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  rate: { type: Number, require: true },
});

module.exports.ProductModel = mongoose.model("Products", productSchema);
