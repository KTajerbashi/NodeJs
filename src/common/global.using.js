const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const Model = require("./common.models");

const ApiResponse = Model.ApiResponse;

const Hash = {
  Encrypt: async (value, key = 12) => {
    return await bcrypt.hash(value, key);
  },
  Decrypt: (value, key) => {},
  IsValidPassword: async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  },
};

module.exports = {
  uuidv4,
  ApiResponse,
  Hash,
};
