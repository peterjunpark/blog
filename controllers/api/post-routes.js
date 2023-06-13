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

// postRouter.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.id);
//     res.json(post);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

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

module.exports = postRouter;
