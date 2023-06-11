const commentRouter = require('express').Router();
const Comment = require('../../models/Comment.js');

commentRouter.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

commentRouter.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = commentRouter;
