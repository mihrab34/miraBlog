const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  reg_date: { type: Date, default: Date.now },
  token: { type: String },
  role: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("User", User);