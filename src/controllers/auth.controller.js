const {
  ApiResponse,
  uuidv4,
  Hash,
  TokenExtensions,
} = require("../common/global.using");
const { UserModel } = require("../models/user.model");
const userController = require("./user.controller");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const validUser = await UserModel.findOne({
    username: username,
  });
  if (validUser === null) {
    res
      .status(404)
      .json(
        ApiResponse.NotFound(
          `Invalid Account (Username : "${username}" Password : "${password}") !!!`
        )
      );
  }
  const validPass = await Hash.IsValidPassword(password, validUser.password);

  if (!validPass) {
    res.json(ApiResponse.Faild(validUser, "Password is not valid !!!"));
  }

  const token = TokenExtensions.GenerateToken({
    email: validUser.email,
  });

  res.json(
    ApiResponse.Success(
      {
        token: token,
        user: validUser,
      },
      "Login Success"
    )
  );
};
const signup = async (req, res, next) => {
  const { username, password, name, family } = req.body;
  const hashPass = await Hash.Encrypt(password);
  const record = new UserModel({ username, password: hashPass, name, family });

  await record.save();

  return res.status(201).json(ApiResponse.Success(record));
  // res.json(ApiResponse.Success(record, "New User Created !!!"));
};

const isValidToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenVerify = TokenExtensions.VerifyToken(token);
  res.json(ApiResponse.Success(tokenVerify));
};
const isAuthorize = async (req, res, next) => {
  res.json(ApiResponse.Success(true));
};
const isAuthenticated = async (req, res, next) => {
  res.json(ApiResponse.Success(true));
};

const disactive = (req, res, next) => {};

module.exports = {
  login,
  signup,
  disactive,
  isValidToken,
  isAuthenticated,
  isAuthorize,
};
