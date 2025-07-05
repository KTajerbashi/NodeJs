const Models = require("../common/common.models");

const userController = require("./user.controller");

userController.users;

const login = (req, res, next) => {
  const { username, password } = req.body;
  const findUser = userController.users.find((item) => {
    if (item.username === username && item.password === password) {
      return item;
    }
    return null;
  });
  if (findUser) {
    res.json(Models.ApiResponse.Success(findUser, "Login Success"));
  }

  res.json(
    Models.ApiResponse.Faild(
      `Invalid Account (Username : "${username}" Password : "${password}") !!!`
    )
  );
};
const signup = (req, res, next) => {
  const model = userController.userModel(req.body);

  userController.users.push(model);

  res.json(Models.ApiResponse.Success(model, "New User Created !!!"));
};
const disactive = (req, res, next) => {};

module.exports = {
  login,
  signup,
  disactive,
};
