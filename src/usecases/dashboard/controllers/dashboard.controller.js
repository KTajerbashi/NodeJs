const { ApiResult } = require("../../../common/global.using");

const dashboard = (req, res, next) => {
  try {
    res.render("dashboard/dashboard_view", {
      title: "Dashboard",
      content: "This goes in the body",
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
const projects = (req, res, next) => {
  try {
    res.render("dashboard/project_view", {
      title: "Dashboard",
      content: "This goes in the body",
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
const team = (req, res, next) => {
  try {
    res.render("dashboard/team_view", {
      title: "Dashboard",
      content: "This goes in the body",
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
const calendar = (req, res, next) => {
  try {
    res.render("dashboard/calendar_view", {
      title: "Dashboard",
      content: "This goes in the body",
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
  team,
  calendar,
  documents,
};
