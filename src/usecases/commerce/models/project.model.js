const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  link: { type: String, require: true },
  teamId: { type: String, require: true },
});
const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = {
  ProjectModel,
};
