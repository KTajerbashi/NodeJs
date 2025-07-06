const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const Model = require("./common.models");
const jwt = require("jsonwebtoken");
const secretKey = "@secret_key";
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

const TokenExtensions = {
  GenerateToken: (data, key = secretKey) => {
    const token = jwt.sign(data, key);
    return token;
  },
  VerifyToken: (token, key = secretKey) => {
    return jwt.verify(token, key);
  },
};

module.exports = {
  uuidv4,
  ApiResponse,
  Hash,
  TokenExtensions,
  secretKey,
};
