const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: { type: String, require: true },
  name: { type: String, require: true },
});
const RoleModel = mongoose.model("Roles", roleSchema);

module.exports = {
  RoleModel,
};
