require("../models/mongooseConnection");
const BlogPost = require("../models/Post");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});

exports.upload = multer({ storage: storage }).single("image");

//display all posts
exports.index = async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    if (posts) {
      res.status(200).json({
        status: true,
        message: "Welcome to the blog",
        data: posts,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Welcome to the blog",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

//get a specific blogPost
exports.blogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    blogPost.view_count += 1;
    blogPost.save();
    if (blogPost) {
      res.status(200).json({
        status: true,
        message: "Blog post",
        data: blogPost,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Failed to fetch blog post",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

//add a post
exports.add = async (req, res) => {
  try {    
    const url = req.protocol + "://" + req.get("host");
  let imagePath = "";
  if (req.file) {
    imagePath = url + "/public/images/" + req.file.filename;
  }
    const post = new BlogPost(req.body);
    post.image = imagePath;
    await post.save();
    if (post) {
      res.status(201).json({
        status: true,
        message: "Blog post successfully added",
        data: post,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Blog post failed to submit",
      });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

// edit a post
exports.edit = async (req, res) => {
  try {
    const post = await BlogPost.updateOne({ _id: req.params.id }, req.body);
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Post edited successful",
        data: post,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Post edit failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

//delete a post
exports.delete = async (req, res) => {
  try {
    const deletePost = await BlogPost.deleteOne({ _id: req.params.id });
    if (deletePost) {
      return res.status(200).json({
        status: true,
        message: "Post deleted successfully",
        data: deletePost,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Post failed to delete",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

//increase number of like on a post
exports.like = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post.like_count) {
      post.like_count += 1;
    } else {
      post.like_count = 1;
    }
    post.dislike_count -= 1;
    await post.save();
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Post liked",
        data: post,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Post like failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.dislike = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post.dislike_count) {
      post.dislike_count += 1;
    } else {
      post.dislike_count = 1;
    }
    post.like_count -= 1;
    await post.save();
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Post Disliked",
        data: post,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Post Dislike failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    post.comments.push(req.body);
    post.comment_count += 1;
    await post.save();
    if (post) {
      res.status(201).json({
        status: true,
        message: "Comment successfully added",
        data: post,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Comment failed to submit",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.comments = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post.comments) {
      res.status(201).json({
        status: true,
        message: "Comment successfully added",
        data: post.comments,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Comment failed to submit",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.editComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    for (const [property, value] of Object.entries(req.body)) {
      post.comments.id(req.params.cid)[property] = value;
    }
    await post.save();
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Comment edited successful",
        data: post.comments.id(req.params.cid),
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Comment edit failed",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    post.comments.pull(req.params.cid);
    await post.save();
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Comment delete successful",
        data: post,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Comment delete failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.replyComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    post.comments.id(req.params.cid).replies.push(req.body);
    post.comments.id(req.params.cid).reply_count += 1;
    await post.save();
    if (post) {
      return res.status(201).json({
        status: true,
        message: "Reply added successfully",
        data: post,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Reply not added",
      });
    }
  } catch (err) {
    return res.status(406).json({
      status: true,
      message: err.message,
    });
  }
};
