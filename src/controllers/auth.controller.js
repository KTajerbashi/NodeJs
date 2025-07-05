const { ApiResponse, uuidv4 } = require("../common/global.using");

const userController = require("./user.controller");

userController.users;

const login = (req, res, next) => {
  const { username, password } = req.body;
  const validUser = userController.users.find((item) => {
    if (item.username === username && item.password === password) {
      return item;
    }
    return null;
  });
  if (validUser) {
    res.json(ApiResponse.Success(validUser, "Login Success"));
  }

  res.json(
    ApiResponse.Faild(
      `Invalid Account (Username : "${username}" Password : "${password}") !!!`
    )
  );
};
const signup = (req, res, next) => {
  const model = userController.userModel(req.body);

  userController.users.push(model);

  res.json(ApiResponse.Success(model, "New User Created !!!"));
};
const disactive = (req, res, next) => {};

module.exports = {
  login,
  signup,
  disactive,
};
