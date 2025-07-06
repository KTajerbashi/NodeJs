const { json } = require("express");
const { TokenExtensions } = require("../common/global.using");
const { ApiResponse } = require("../common/common.models");
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const tokenVerify = TokenExtensions.VerifyToken(token);

    req.userData = {
      user: tokenVerify,
    };

    next();
  } else {
    res.json(ApiResponse.UnAuthorized("token not exist!!!"));
  }
};
