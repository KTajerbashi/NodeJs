const { PORT } = require("./common/global.using");

const app = require("./app");
const Database = require("./database/mongobd");

const application = app.startup();

Database.startup(() => {
  // Start Server
  const server = application.listen(PORT, () => {
    //
    console.log(`🛒 E-commerce app running on port ${PORT}`);
    //
    console.log(`➡️  Visit: http://localhost:${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("⛔ Unhandled Rejection:", err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("⛔ Uncaught Exception:", err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Handle SIGTERM for graceful shutdown (Docker, Kubernetes)
  process.on("SIGTERM", () => {
    console.log("🛑 SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("💤 Process terminated!");
    });
  });
});
