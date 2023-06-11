const path = require('path');
const express = require('express');
const { create } = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3002;
const hbs = create({});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
