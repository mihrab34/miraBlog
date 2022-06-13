const router = require('express').Router();
const controller = require('../controllers/postController');
const authenticateUser = require("../../middlewares/authenticateUser");

// post routes
router.get('/',  controller.index);
router.get('/:id', authenticateUser, controller.blogPost);
router.post("/", authenticateUser, controller.upload, controller.add);
router.put("/:id", authenticateUser, controller.upload, controller.edit);
router.delete("/:id", authenticateUser, controller.delete);
router.put("/:id/like", authenticateUser, controller.like);
router.put("/:id/dislike", authenticateUser, controller.dislike);

//comment routes
router.get("/:id/comments", authenticateUser, controller.comments);
router.post("/:id/comments", authenticateUser, controller.addComment);
router.put("/:id/comments/:cid", authenticateUser, controller.editComment);
router.delete("/:id/comments/:cid", authenticateUser, controller.deleteComment);
router.post(
  "/:id/comments/:cid/reply",
  authenticateUser,
  controller.replyComment
);

module.exports = router;
