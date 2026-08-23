import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const port = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  console.log("Starting server...");
  console.log("Connecting to MongoDB...");

  await connectDatabase();

  console.log("MongoDB connection completed.");
  console.log(`Starting Express on port ${port}...`);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  app.use(errorMiddleware);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});