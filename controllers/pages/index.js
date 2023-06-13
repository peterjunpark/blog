const pagesRouter = require('express').Router();
const homePageRouter = require('./home-page.js');
const loginSignupPageRouter = require('./login-signup-page.js');
const newPostPageRouter = require('./new-post-page.js');
// const profilePageRouter = require('./profile-page.js');

pagesRouter.use(homePageRouter);
pagesRouter.use(loginSignupPageRouter);
pagesRouter.use('/new-post', newPostPageRouter);
// pagesRouter.use('/profile', profilePageRouter);

module.exports = pagesRouter;
