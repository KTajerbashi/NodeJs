const { ApiResult } = require("../../../common/global.using");
const { validationResult } = require("express-validator");
const { EventModel } = require("../models/event.model");

const insertModel = async (body) => {
  const { id, title, description, OwnerName, createDate, startDate, endDate } =
    body;
  const model = new EventModel({
    title,
    description,
    OwnerName,
    createDate,
    startDate,
    endDate,
  });
  return model;
};
const getEventModel = (body) => {
  const { id, title, description, OwnerName, createDate, startDate, endDate } =
    body;
  return {
    id: id,
    title: title,
    description: description,
    OwnerName: OwnerName,
    createDate: createDate,
    startDate: startDate,
    endDate: endDate,
  };
};

// ✅ Create
const createEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }
  const model = await insertModel(req.body);
  await model.save();
  res.json(ApiResult.Success(model));
};
// ✅ Update
const updateEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(ApiResult.Faild(errors, "Validation Errors !!!"));
  }

  const id = req.params.id;
  const parameter = getEventModel(req.body);

  try {
    const record = await EventModel.findByIdAndUpdate(
      id,
      { ...parameter }, // Update object
      { new: true } // Options
    );

    if (!record) {
      return res
        .status(404)
        .json(ApiResult.NotFound(`event with ID ${id} not found.`));
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
const deleteEvent = async (req, res, next) => {
  const id = req.params.id;
  const record = await EventModel.findByIdAndDelete(id);
  if (record === null) {
    return res
      .status(404)
      .json(ApiResult.NotFound(`event with ID ${id} not found.`));
  }

  return res
    .status(200)
    .json(ApiResult.Success(`Deleted event ID: ${id}`, record));
};
// ✅ Get All
const getEvents = async (req, res, next) => {
  const response = await EventModel.find();
  res.json(ApiResult.Success(response));
};
// ✅ Get By Id
const getEventById = async (req, res, next) => {
  const id = req.params.id;
  const response = await EventModel.findById(id);
  res.json(ApiResult.Success(response));
};

//  Index Route : api/event/
const index = (req, res, next) => {
  res.redirect("/event");
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent,
  index,
  insertModel,
};
