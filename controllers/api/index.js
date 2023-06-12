const apiRouter = require('express').Router();
const authRouter = require('./auth-routes.js');
const commentRouter = require('./comment-routes.js');
const postRouter = require('./post-routes.js');
const userRouter = require('./user-routes.js');

apiRouter.use(authRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;
