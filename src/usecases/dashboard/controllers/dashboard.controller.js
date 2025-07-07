const { EventModel } = require("../models/event.model");
const { ProjectModel } = require("../models/project.model");

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
const projects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    res.render("dashboard/project_view", {
      title: "Projects",
      projects: projects ?? [],
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
const calendar = async (req, res, next) => {
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
const documents = (req, res, next) => {
  try {
    res.render("dashboard/documents_view", {
      title: "Documents",
      content: "This goes in the body",
    });
  } catch (err) {
    console.error("Document error:", err);
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
  dashboard,
  index,
  projects,
  calendar,
  documents,
};
