exports.notFound = (req, res, next) => {
  console.log(`404: ${req.method} ${req.originalUrl}`);
  res.status(404).render("common/404", {
    title: "Page Not Found",
    layout: "_layouts/main",
    attemptedUrl: req.originalUrl, // Pass the attempted URL to the view
  });
};

exports.serverError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("common/500", {
    title: "Server Error",
    layout: "_layouts/main",
  });
};
