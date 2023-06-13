const pagesRouter = require('express').Router();
const homePageRouter = require('./home-page.js');
const loginSignupPageRouter = require('./login-signup-page.js');
const newPostPageRouter = require('./new-post-page.js');
const postPageRouter = require('./post-page.js');
const dashboardRouter = require('./dashboard.js');

pagesRouter.use(homePageRouter);
pagesRouter.use(loginSignupPageRouter);
pagesRouter.use('/new-post', newPostPageRouter);
pagesRouter.use('/dashboard', dashboardRouter);
pagesRouter.use('/post', postPageRouter);

module.exports = pagesRouter;
