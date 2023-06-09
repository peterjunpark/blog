const routes = require('express').Router();
// const apiRoutes = require('./api');
// routes.use('/api', apiRoutes);

routes.get('/', (req, res) => {
  res.render('home');
});

routes.get('/login', (req, res) => {
  res.render('login');
});

module.exports = routes;
