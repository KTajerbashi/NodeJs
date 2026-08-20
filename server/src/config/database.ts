import mongoose from "mongoose";
import process from "node:process";

export async function connectDatabase(): Promise<void> {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error("MONGODB_URI is not defined.");
  }

  await mongoose.connect(connectionString);

  console.log("MongoDB connected.");
}