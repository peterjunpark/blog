const path = require('path');
const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const helpers = require('./utils/helpers.js');

const PORT = process.env.PORT || 3002;
const app = express();
const hbs = create({ helpers });
const sess = {
  secret: 'super duper secret secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
  saveUninitialized: false,
  // secure: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

async function start() {
  await sequelize.sync({ force: false });
  app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
  );
}

start();
