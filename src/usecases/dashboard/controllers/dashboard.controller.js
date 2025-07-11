const { EventModel } = require("../models/event.model");
const { ProjectModel } = require("../../commerce/models/project.model");

const dashboard = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    const events = await EventModel.find();
    res.render("dashboard/dashboard_view", {
      title: "Dashboard",
      model: {
        projectCount: projects.length,
        eventCount: events.length,
      },
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

const index = (req, res, next) => {
  res.redirect("/dashboard");
};

module.exports = {
  index,
  dashboard,
};
