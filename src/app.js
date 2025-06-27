const express = require("express");
const path = require("path");
const mainRouter = require("./routes/main.routes");
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const errorRouter = require("./middlewares/error.middleware");

const app = express();

//  body parser config
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public/")));
app.use(adminRouter);
app.use(userRouter);
app.use(mainRouter);
app.use(errorRouter);
// const server = http.createServer(app);
// server.listen(8000);
app.listen(8000);
