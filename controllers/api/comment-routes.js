const commentRouter = require('express').Router();
const Comment = require('../../models/Comment.js');

commentRouter.post('/', async (req, res) => {
  try {
    const comment = {
      post_id: req.body.postId,
      body: req.body.body,
      user_id: req.session.userId,
    };
    const newComment = await Comment.create(comment);
    res.json(newComment);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not create comment.' });
  }
});

module.exports = commentRouter;
