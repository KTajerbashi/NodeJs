const { ApiResult } = require("../../../../common/global.using");
const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/security/user.model");

const insertModel = async (body) => {
  const { id, username, password, name, family } = body;
  const hashPass = await Hash.Encrypt(password);
  const model = new UserModel({ username, password: hashPass, name, family });
  return model;
};

// ✅ Create
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }
  const model = await insertModel(req.body);
  await model.save();
  res.json(ApiResult.Success(model));
};
// ✅ Update
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }

  const id = req.params.id;
  const { username, password, name, family } = req.body;

  try {
    const record = await UserModel.findByIdAndUpdate(
      id,
      { username, password, name, family }, // Update object
      { new: true } // Options
    );

    if (!record) {
      return res
        .status(404)
        .json(ApiResult.NotFound(`user with ID ${id} not found.`));
    }

    return res.status(200).json(ApiResult.Success(record));
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json(ApiResult.Faild(error.message, "Update failed"));
  }
};
// ✅ Delete
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const record = await UserModel.findByIdAndDelete(id);
  if (record === null) {
    return res
      .status(404)
      .json(ApiResult.NotFound(`user with ID ${id} not found.`));
  }

  return res
    .status(200)
    .json(ApiResult.Success(`Deleted user ID: ${id}`, record));
};
// ✅ Get All
const getUsers = async (req, res, next) => {
  const response = await UserModel.find();
  res.json(ApiResult.Success(response));
};
// ✅ Get By Id
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  const response = await UserModel.findById(id);
  res.json(ApiResult.Success(response));
};

//  Index Route : api/user/
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
  insertModel,
};
