const Application = require("./configs/server.config");
const routes = require("./routes/root.routes");
const common_routes = require("./routes/common.routes");
const connectDB = require("./configs/database.config");
const MiddlewarePipes = require("./configs/pipline.config");
const ViewConfiguration = require("./configs/view.config");
const { notFound, serverError } = require("./middlewares/errorHandler");
Application.startApp(async (app) => {
  await connectDB();
  MiddlewarePipes.configuration(app);
  ViewConfiguration.handler(app);

  // Add this before your routes
  app.use((req, res, next) => {
    // Make these variables available to all views
    res.locals.activePage = "";
    res.locals.title = "Node Store";
    next();
  });

  app.use(routes);
  app.use(common_routes);
  // Catch 404 and forward to error handler
  app.use(notFound);
  // Error handler
  // app.use(serverError);
});
