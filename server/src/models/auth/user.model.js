const mongoose = require("mongoose");
const UserSchema = mongoose.model("User", new Schema({ name: String }));

module.exports = {
  UserSchema,
};
