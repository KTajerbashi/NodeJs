const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  const template = `
  <div style="text-align:center;">
    <h1>Main Page</h1>
    <hr/>
    <div >
        <a href="/dashboard">Dashboard</a>
        <br/>
        <a href="/user">User</a>
    </div>
  </div>
  `;
  res.send(template);
});

module.exports = router;
