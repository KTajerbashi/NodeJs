const { ApiResult } = require("../../../../common/global.using");
const { validationResult } = require("express-validator");
const { RoleModel } = require("../../models/security/role.model");

const insertModel = async (body) => {
  const { id, title, name } = body;
  const model = new RoleModel({ title, name });
  return model;
};

// ✅ Create
const createRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }
  const model = await insertModel(req.body);
  await model.save();
  res.json(ApiResult.Success(model));
};
// ✅ Update
const updateRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }

  const id = req.params.id;
  const { rolename, password, name, family } = req.body;

  try {
    const record = await RoleModel.findByIdAndUpdate(
      id,
      { rolename, password, name, family }, // Update object
      { new: true } // Options
    );

    if (!record) {
      return res
        .status(404)
        .json(ApiResult.NotFound(`role with ID ${id} not found.`));
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
const deleteRole = async (req, res, next) => {
  const id = req.params.id;
  const record = await RoleModel.findByIdAndDelete(id);
  if (record === null) {
    return res
      .status(404)
      .json(ApiResult.NotFound(`Role with ID ${id} not found.`));
  }

  return res
    .status(200)
    .json(ApiResult.Success(`Deleted role ID: ${id}`, record));
};
// ✅ Get All
const getRoles = async (req, res, next) => {
  const response = await RoleModel.find();
  res.json(ApiResult.Success(response));
};
// ✅ Get By Id
const getRoleById = async (req, res, next) => {
  const id = req.params.id;
  const response = await RoleModel.findById(id);
  res.json(ApiResult.Success(response));
};

//  Index Route : api/role/
const index = (req, res, next) => {
  res.redirect("/role");
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  deleteRole,
  updateRole,
  index,
  insertModel,
};
