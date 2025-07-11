const { DocumentModel } = require("../../models/document.model");

const index = (req, res, next) => {
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
module.exports = {
  index,
};
