const pagesRouter = require('express').Router();
const homePageRouter = require('./home-page.js');
const loginPageRouter = require('./login-page.js');
const newPostPageRouter = require('./new-post-page.js');
// const profilePageRouter = require('./profile-page.js');

pagesRouter.use(homePageRouter);
pagesRouter.use('/login', loginPageRouter);
pagesRouter.use('/new-post', newPostPageRouter);
// pagesRouter.use('/profile', profilePageRouter);

module.exports = pagesRouter;
