// import library
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// import self made library
const routes = require('./routes');
require('./config/mongoose');

// express setting
const app = express();
const port = 3000;

// settings & middleware
app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routing
app.use(routes);

// server listen
app.listen(port, () => {
  console.log(`Server is listening in port ${port}.`);
})