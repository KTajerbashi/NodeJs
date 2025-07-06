const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  family: { type: String, require: true },
});
const UserModel = mongoose.model("Users", userSchema);

module.exports = {
  UserModel,
};
