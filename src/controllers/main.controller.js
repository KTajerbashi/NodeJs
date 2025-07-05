const Model = require("../common/common.models");

const dashboard = (req, res, next) => {
  res.json(Model.ApiResponse.Success("Loaded Dashboard"));
};

const index = (req, res, next) => {
  res.redirect("/dashboard");
};

module.exports = {
  dashboard,
  index,
};
