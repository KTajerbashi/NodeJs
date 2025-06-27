const express = require("express");
const router = express.Router();

router.use("/dashboard", (req, res, next) => {
  const template = `
  <div style="text-align:center;">
    <h1>Admin Dashboard</h1>
    <a href="/add-user">Add User</a>
    <br/>
    <a href="/">Main</a>
  </div>
  `;
  res.send(template);
});
router.use("/add-user", (req, res, next) => {
  const template = `
    <div style="text-align:center;">
      <h1>Add User Pager</h1>
    
      <form action='/user' method="POST">
          <input name="username" type="text"/>
          <button>Submit</button>
      </form>

    <a href="/dashboard">Back</a>

      </div>
    `;
  res.send(template);
});

router.post("/user", (req, res, next) => {
  console.log("User Added : ", req.body);
  res.redirect("/dashboard");
});

module.exports = router;
