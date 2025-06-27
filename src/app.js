const express = require("express");
const mainRouter = require("./routes/main.routes");
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const errorRouter = require("./middlewares/error.middleware");

const app = express();

//  body parser config
app.use(express.urlencoded({ extended: false }));

app.use(adminRouter);
app.use(userRouter);
app.use(errorRouter);
app.use(mainRouter);
// const server = http.createServer(app);
// server.listen(8000);
app.listen(8000);
