const apiRouter = require('express').Router();
const commentRouter = require('./comment-routes.js');
const postRouter = require('./post-routes.js');
const userRouter = require('./user-routes.js');

apiRouter.get('/', (req, res) => {
  res.json({ message: 'hi' });
});

apiRouter.use('/comment', commentRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;
