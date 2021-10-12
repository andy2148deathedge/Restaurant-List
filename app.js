// import library
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const restaurant = require('./restaurant.json');

const app = express();
const port = 3000;

// import handlebars
app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error');
})

db.once('open', () => { 
  console.log('mongodb connected');
})

//setting static files
app.use(express.static('public'));
  
// index routing
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurant.results });  
})

// search result routing
app.get('/search', (req, res) => {
  let { keyword } = req.query;
  restaurantFiltered = restaurant.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  
  res.render('index', { restaurant: restaurantFiltered, keyword: keyword });  
})

// show page routing
app.get('/restaurants/:id', (req, res) => {
  let id = Number(req.params.id) - 1;
  res.render('show', { restaurant : restaurant.results[id]});
})

// sever listen
app.listen(port, () => {
  console.log(`Server is listening in port ${port}.`);
})