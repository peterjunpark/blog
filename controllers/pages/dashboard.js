const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const authUser = require('../../utils/auth.js');

router.get('/', authUser, async (req, res) => {
  const userData = await User.findByPk(req.session.userId, {
    attributes: ['username', 'email'],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
      },
      {
        model: Comment,
        attributes: ['body', 'createdAt', 'updatedAt'],
        include: {
          model: Post,
          attributes: ['title', 'id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      },
    ],
    order: [
      [Post, 'updatedAt', 'DESC'],
      [Comment, 'updatedAt', 'DESC'],
    ],
  });
  const user = await userData.get({ plain: true });
  res.render('dashboard', { loggedIn: req.session.loggedIn, data: user });
});

module.exports = router;
