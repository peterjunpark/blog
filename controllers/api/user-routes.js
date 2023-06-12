const userRouter = require('express').Router();
const User = require('../../models/User.js');

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res
      .User(500)
      .json({ message: 'Internal server error. Could not get users.' });
  }
});

// Get a user by id
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not get user.' });
  }
});

// Create a new user
userRouter.post('/', async (req, res) => {
  try {
    // If user is found, do not create.
    const [newUser, created] = await User.findOrCreate({
      where: { username: req.body.username },
      defaults: {
        password: req.body.password,
        email: req.body.email,
      },
    });
    // If user was not created just now, respond 409.
    if (!created) {
      res
        .status(409)
        .json({ message: 'Could not create user. User already exists.' });
      return;
    }
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not create user.' });
  }
});

// Delete user.
userRouter.delete('/', async (req, res) => {
  try {
    await User.destroy({
      // Find by session id.
      where: { id: req.session.userId },
    });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not delete user.' });
  }
});

module.exports = userRouter;
