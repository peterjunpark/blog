// New post page
const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render('new-post', {
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
