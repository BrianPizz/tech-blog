// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// Routes and sql config
const routes = require('./controllers');
const sequelize = require('./config/connection');
// Express app an dPORT
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars to run view
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});