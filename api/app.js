require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const app = express();

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const postRouter = require("./src/blog/routes/postRoute");
app.use("/api/blog/posts", postRouter);

const userRouter = require("./src/user/routes/userRoute");
app.use("/api/blog/users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

module.exports = app;
