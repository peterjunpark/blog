const router = require('express').Router();
const apiRoutes = require('./api');

// Server static HTML
router.get('/', (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'testicles' });
});

router.use('/api', apiRoutes);

module.exports = router;
