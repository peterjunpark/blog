const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', { disableBtn: true });
});

router.get('/signup', (req, res) => {
  res.render('signup', { disableBtn: true });
});

module.exports = router;
