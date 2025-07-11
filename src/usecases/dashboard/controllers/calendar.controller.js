const { EventModel } = require("../models/event.model");
const { ProjectModel } = require("../../commerce/models/project.model");

const index = async (req, res, next) => {
  try {
    const events = await EventModel.find();
    res.render("dashboard/calendar_view", {
      title: "Calendar & Events",
      events: events ?? [],
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).render("error", {
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  }
};

module.exports = {
  index,
};
