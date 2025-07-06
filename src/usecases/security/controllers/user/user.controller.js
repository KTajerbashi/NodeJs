const users = (req, res, next) => {
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
module.exports = {
  users,
};
