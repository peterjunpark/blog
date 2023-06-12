// User sign-in
const authRouter = require('express').Router();
const User = require('../../models/User.js');

authRouter.post('/login', async (req, res) => {
  try {
    // Get username or email from client.
    const [userByUsername, userByEmail] = await Promise.all([
      User.findOne({
        where: { username: req.body.login },
      }),
      User.findOne({
        where: { email: req.body.login },
      }),
    ]);
    // Check if the user exists.
    const user = userByUsername || userByEmail;
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    // Check password.
    const auth = await user.authPassword(req.body.password);
    if (!auth) {
      res.status(401).json({ message: 'Wrong password.' });
      return;
    }
    // Add userId and loggedIn data to session. Save session to db.
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
      res.json({ message: 'Successfully signed in.', user: user });
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal server error. Could not sign in.' });
  }
});

// User sign-out
authRouter.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy();
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ message: 'Internal server error. Sign out failed.' });
  }
});

module.exports = authRouter;
