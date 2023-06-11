const userRouter = require('express').Router();
const User = require('../../models/User.js');

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.User(500).json({ message: 'Internal server error.' });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = userRouter;
