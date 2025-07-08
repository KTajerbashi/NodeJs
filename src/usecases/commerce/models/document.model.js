const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema({
  name: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  link: { type: String, require: true },
  recordId: { type: String, require: true },
});
const DocumentModel = mongoose.model("Documents", documentSchema);

module.exports = {
  DocumentModel,
};
