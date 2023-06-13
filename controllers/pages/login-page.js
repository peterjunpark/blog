const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('login', { disableBtn: true });
});

module.exports = router;
