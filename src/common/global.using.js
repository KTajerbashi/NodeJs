const { v4: uuidv4 } = require("uuid");

const Model = require("./common.models");

const ApiResponse = Model.ApiResponse;

module.exports = {
  uuidv4,
  ApiResponse,
};
