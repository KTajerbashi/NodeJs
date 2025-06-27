const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const template = `
  <div style="text-align:center;">
    <h1 style="color:red; font-size:32px;">Not Found</h1>
  </div>
  `;
  res.status(404).send(template);
});

module.exports = router;
