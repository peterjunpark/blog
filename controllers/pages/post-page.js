const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const authUser = require('../../utils/auth.js');

router.get('/:id', authUser, async (req, res) => {
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

  // Check if current user is owner of the post. If yes, enable delete and edit buttons.
  // if (req.session.userId === )
  const postOwner = post.user_id === req.session.userId;
  res.render('post', { post, loggedIn: req.session.loggedIn, postOwner });
});

module.exports = router;
