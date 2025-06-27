const http = require("http");

const express = require("express");

const app = express();

//  body parser config
app.use(express.urlencoded({ extended: false }));

//  Use Middleware after app and befor create server
app.use("/add-product", (req, res, next) => {
  const template = `
  <div style="text-align:center;">
    <h1>Add Product Page</h1>
    <form action="/product" method="POST">
      <input type="text" name="title"/>
      <button>Add Product</button>
    </form>
    <a href="/">Go To Index</a>
  </div>
  `;
  res.send(template);
});
app.post("/product", (req, res, next) => {
  console.log("Body : ", req.body);
  console.log("Title : ", req.body.title);
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  const template = `
  <div style="text-align:center;">
    <h1>Index Page</h1>
    <a href="/product">Go To Product</a>
    <hr/>
    <a href="/add-product">Go To Add Product</a>
  </div>
  `;
  res.send(template);
});

// const server = http.createServer(app);
// server.listen(8000);
app.listen(8000);
