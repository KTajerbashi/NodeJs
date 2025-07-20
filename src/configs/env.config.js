require("dotenv").config({ debug: true });

module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
