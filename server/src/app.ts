import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";

console.log("🚀 app.ts started");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/users", userRoutes);

app.use("/api/roles", roleRoutes);

export default app;