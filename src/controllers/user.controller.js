const { ApiResponse, uuidv4 } = require("../common/global.using");
const { validationResult } = require("express-validator");
const users = [];

const userModel = (body) => {
  const { id, username, password, name, family } = body;
  return {
    id: id ?? uuidv4(),
    username: username,
    password: password,
    name: name,
    family: family,
  };
};

const getUsers = (req, res, next) => {
  const response = users;
  res.json(ApiResponse.Success(response));
};

const getUserById = (req, res, next) => {
  const id = req.params.id;
  const response = users.find((item) => item.id === id);
  res.json(ApiResponse.Success(response));
};
const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResponse.Faild(errors, "Validation Errors !!!"));
  }
  const model = userModel(req.body);
  users.push(model);
  res.json(ApiResponse.Success(model));
};
const deleteUser = (req, res, next) => {
  const id = req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);

  if (userIndex === -1) {
    return res
      .status(404)
      .json(ApiResponse.NotFound(`user with ID ${id} not found.`));
  }

  const deleteduser = users.splice(userIndex, 1);

  return res
    .status(200)
    .json(ApiResponse.Success(`Deleted user ID: ${id}`, deleteduser));
};
const updateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors) {
    console.log("Errors : ", errors);
    const errorMessages = errors.mapped((item) => {
      return {
        name: item.path,
        error: item.msg,
      };
    });
    res
      .status(422)
      .json(ApiResponse.Faild(errorMessages, "Validation Errors !!!"));
  }

  const id = req.params.id;
  const model = userModel(req.body);

  let user = users.find((p) => p.id === id);

  if (!user) {
    return res
      .status(404)
      .json(ApiResponse.NotFound(`user with ID ${id} not found.`));
  }

  if (user) {
    user = model;
  }

  return res.status(200).json(ApiResponse.Success(user));
};
const index = (req, res, next) => {
  res.redirect("/user");
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  index,
  users,
  userModel,
};
