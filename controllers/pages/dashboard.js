const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).redirect('/login');
    return;
  }
  const userData = await User.findByPk(req.session.userId, {
    attributes: ['username', 'email'],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt'],
        order: [['updatedAt', 'DESC']],
      },
      {
        model: Comment,
        attributes: ['body', 'createdAt', 'updatedAt'],
        include: {
          model: Post,
          attributes: ['title'],
          order: [['updatedAt', 'DESC']],
        },
      },
    ],
    order: [[Post, 'updatedAt', 'DESC']],
  });
  const user = await userData.get({ plain: true });
  res.render('dashboard', { loggedIn: req.session.loggedIn, data: user });
});

module.exports = router;
