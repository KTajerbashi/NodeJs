const { ApiResult } = require("../../../common/global.using");
const login = (req, res, next) => {
  const { body } = req;
  console.log("Body : ", body);
};
module.exports = {
  login,
};
