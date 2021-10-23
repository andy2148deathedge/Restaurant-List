// import library
const express = require('express');
const sessions = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// import self made library
const routes = require('./routes');
const usePassport = require('./config/passport');
require('./config/mongoose');

// express setting
const app = express();
const PORT = process.env.PORT;

// settings & middleware
app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(sessions({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  next();
});

// routing
app.use(routes);

// server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
})