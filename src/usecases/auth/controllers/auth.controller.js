const login = (req, res, next) => {
  try {
    res.render("auth/login_view", {
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

const signin = (req, res, next) => {
  try {
    res.render("auth/signin_view", {
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

module.exports = {
  login,
  signin,
};
