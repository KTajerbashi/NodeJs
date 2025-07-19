const path = require("path");
require("app-module-path").addPath(path.join(__dirname, "../src"));
const Application = require("./src/configs/server.config");
const routes = require("./src/routes/root.routes");
const common_routes = require("./src/routes/common/common.routes");
const connectDB = require("./src/configs/database.config");
const MiddlewarePipes = require("./src/configs/pipline.config");
const ViewConfiguration = require("./src/configs/view.config");
const { notFound, serverError } = require("./src/middlewares/errorHandler");
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
