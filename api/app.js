require('dotenv').config()

const createError = require('http-errors');
const express = require('express');

const app = express();


app.use(express.json());

const postRouter = require("./src/routes/postRoute");
app.use('/api/blog/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
