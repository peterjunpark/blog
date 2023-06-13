const postRouter = require('express').Router();
const { Post, Comment } = require('../../models');

postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: Comment,
      },
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

postRouter.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = postRouter;
