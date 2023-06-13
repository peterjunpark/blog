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

postRouter.post('/', async (req, res) => {
  try {
    const post = {
      user_id: req.session.userId,
      title: req.body.title,
      body: req.body.body,
    };
    const newPost = await Post.create(post);
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Post could not be created.' });
  }
});

postRouter.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({ where: { post_id: req.params.id } });
    await Post.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Post could not be deleted.' });
  }
});

postRouter.put('/:id', async (req, res) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.userId,
      },
      { where: { id: req.params.id } }
    );
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Post could not be updated.' });
  }
});

module.exports = postRouter;
