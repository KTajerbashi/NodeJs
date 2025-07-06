const express = require("express");
const { ApiResult } = require("../common/globa.models");
const router = express.Router();

module.exports = router.use((req, res, next) => {
  const token = req.headers.authorization ?? "123";
  if (token.length === 0) {
    res.json(
      ApiResult.UnAuthorized(
        {
          token: token,
        },
        "token not set !!!"
      )
    );
  } else {
    next();
  }
});
