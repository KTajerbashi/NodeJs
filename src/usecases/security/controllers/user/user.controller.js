const { UserModel } = require("../../models/security/user.model");

const users = async (req, res, next) => {
  const users = await UserModel.find();
  try {
    res.render("security/user_view", {
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
const team = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.render("security/team_view", {
      title: "Team Group ",
      users: users ?? [],
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
  team,
  users,
};
