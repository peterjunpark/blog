const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/', async (req, res) => {
  const rawPosts = await Post.findAll({
    order: [['createdAt', 'DESC']],
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
  const posts = rawPosts.map((rawPost) => {
    return rawPost.get({ plain: true });
  });

  res.render('home', { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;
