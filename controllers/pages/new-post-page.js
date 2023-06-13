const router = require('express').Router();
const authUser = require('../../utils/auth.js');

router.get('/', authUser, (req, res) => {
  res.render('new-post', {
    userId: req.session.userId,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
