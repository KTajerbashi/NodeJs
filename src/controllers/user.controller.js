const Models = require("../common/common.models");

const users = [];

const userModel = (body) => {
  console.log("BODY : ", body);
  const { id, username, password, name, family } = body;
  return {
    id: id ?? Math.round(Math.random() * 10000),
    username: username,
    password: password,
    name: name,
    family: family,
  };
};

const getUsers = (req, res, next) => {
  const response = users;
  res.json(Models.ApiResponse.Success(response));
};
const getUserById = (req, res, next) => {
  const id = Number(req.params.id);
  const response = users.find((item) => item.id === id);
  res.json(Models.ApiResponse.Success(response));
};
const createUser = (req, res, next) => {
  const model = userModel(req.body);
  users.push(model);
  res.json(Models.ApiResponse.Success(model));
};
const deleteUser = (req, res, next) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((p) => p.id === id);

  if (userIndex === -1) {
    return res
      .status(404)
      .json(Models.ApiResponse.NotFound(`user with ID ${id} not found.`));
  }

  const deleteduser = users.splice(userIndex, 1);

  return res
    .status(200)
    .json(Models.ApiResponse.Success(`Deleted user ID: ${id}`, deleteduser));
};
const updateUser = (req, res, next) => {
  const id = Number(req.params.id);
  const model = userModel(req.body);

  let user = users.find((p) => p.id === id);

  if (!user) {
    return res
      .status(404)
      .json(Models.ApiResponse.NotFound(`user with ID ${id} not found.`));
  }

  if (user) {
    user = model;
  }

  return res.status(200).json(Models.ApiResponse.Success(user));
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
