const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  OwnerName: { type: String, require: true },
  createDate: { type: Date, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
});
const EventModel = mongoose.model("events", eventSchema);

module.exports = {
  EventModel,
};
