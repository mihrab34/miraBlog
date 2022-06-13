const mongoose = require("mongoose");

const Reply = new mongoose.Schema({
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
  },
});

const Comment = new mongoose.Schema({
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
  },
  like_count: {
    type: Number,
    default: 0,
  },
  dislike_count: {
    type: Number,
    default: 0,
  },
  replies: [Reply],

  reply_count: {
    type: Number,
    default: 0,
  },
});

const BlogPost = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  post_title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  article: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  comment_count: {
    type: Number,
    default: 0,
  },
  like_count: {
    type: Number,
    default: 0,
  },
  dislike_count: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  comments: [Comment],
});

module.exports = mongoose.model("BlogPost", BlogPost);
