require("../models/mongooseConnection");
const BlogPost = require("../models/Post");

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
    const post = new BlogPost(req.body);
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

exports.dislike = (req, res) => {
  res.send("Dislikes");
};

exports.addComment = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);;
    post.comments.push(req.body);
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

exports.comments = async(req, res) => {
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

exports.editComment = async(req, res) => {
  try {
    // let modifiedObj = {}
    // for (const [property, value] of Object.entries(req.body)){
    //   modifiedObj={ "comments.$.text": value}
    //   console.log(modifiedObj);
    // }
    
    // const comment = BlogPost.updateOne(
    //   { _id: req.params.id, "comments._id": req.params.cid },
    //   { $set: modifiedObj }
    // );
    const post = await BlogPost.findById(req.params.id);
    for (const [property, value] of Object.entries(req.body)){
   post.comments.id(req.params.cid)[property] = value;
    }
    // post.comments.id(req.params.cid).text = req.body.text;
    await post.save();
    // console.log(comment.text);
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
    console.log(err)
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};

exports.deleteComment = (req, res) => {
  res.send("Delete a comment");
};

exports.replyComment = (req, res) => {
  res.send("Reply a comment");
};
