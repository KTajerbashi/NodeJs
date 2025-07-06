//  Environment Configuration
require("dotenv").config();
const mongoose = require("mongoose");
module.exports = class Database {
  constructor() {
    this.startup();
  }
  static startup(callback) {
    const DB_URI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nodeapp";

    mongoose
      .connect(DB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      })
      .then(() => {
        callback();
        console.log("✅ Connected to MongoDB");
      })
      .catch((err) => console.error("❌ MongoDB connection error:", err));

    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("error", (err) =>
      console.log("MongoDB error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB disconnected")
    );
  }
};
