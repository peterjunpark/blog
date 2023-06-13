const router = require('express').Router();

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).redirect('/login');
  } else {
    res.render('new-post', {
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
    });
  }
});

module.exports = router;
