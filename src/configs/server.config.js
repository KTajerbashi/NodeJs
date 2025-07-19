const express = require("express");
const app = express();
const PORT = 3000;

module.exports = class Application {
  /**
   *
   */
  constructor() {
    console.log("constructor Application ...");
  }

  static startApp = async (callback) => {
    await callback(app);
    app.listen(PORT, () => {
      console.log(`Express server running at http://127.0.0.1:${PORT}/`);
    });
  };
};
