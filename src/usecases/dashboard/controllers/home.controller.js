const { ApiResult } = require("../../../common/global.using");

const loadDashboard = async (req, res, next) => {
  try {
    res.render("index", {
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
  // res.json(ApiResult.Success("loadDashboard"));
};

const index = (req, res, next) => {
  res.redirect("/dashboard");
};

module.exports = {
  loadDashboard,
  index,
};
