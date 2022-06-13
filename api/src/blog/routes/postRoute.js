const router = require('express').Router();
const controller = require('../controllers/postController');

// post routes
router.get('/', controller.index);
router.get('/:id', controller.blogPost);
router.post("/", controller.upload, controller.add);
router.put("/:id", controller.upload, controller.edit);
router.delete('/:id', controller.delete);
router.put('/:id/like', controller.like);
router.put('/:id/dislike', controller.dislike);

//comment routes
router.get( '/:id/comments',controller.comments)
router.post('/:id/comments',controller.addComment)
router.put('/:id/comments/:cid',controller.editComment)
router.delete('/:id/comments/:cid',controller.deleteComment)
router.post('/:id/comments/:cid/reply',controller.replyComment)

module.exports = router;
