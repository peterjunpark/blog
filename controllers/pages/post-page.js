const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/:id', async (req, res) => {
  const rawPost = await Post.findByPk(req.params.id, {
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['body', 'user_id', 'createdAt', 'updatedAt'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  const post = await rawPost.get({ plain: true });
  console.log(post);
  res.render('post', { post, loggedIn: req.session.loggedIn });
});

module.exports = router;
