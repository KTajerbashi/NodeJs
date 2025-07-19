const mongoose = require("mongoose");
const { dbUri } = require("./env.config");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at:", dbUri);
    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Add event listeners for debugging
mongoose.connection.on("connecting", () => console.log("🔃 Connecting..."));
mongoose.connection.on("connected", () => console.log("✅ Connected!"));
mongoose.connection.on("disconnected", () => console.log("🔓 Disconnected!"));
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB error:", err)
);

module.exports = connectDB;
