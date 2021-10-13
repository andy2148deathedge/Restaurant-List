// import library
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
// const restaurant = require('./restaurant.json'); // 已用該檔直接在 MONGO DB 產生種子資料 改為直接用 shop.js
const Shop = require('./models/shop');
const bodyParser = require('body-parser');

// express setting
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

// setting static files
app.use(express.static('public'));

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));



// ROUTING
app.get('/', (req, res) => { // index routing
  // 拿 collection Shop 的資料
  Shop.find()
    .lean()
    .then((shops) => {
      res.render('index', { restaurant: shops })
    })
    .catch( e => console.log(e));
})

app.get('/search', (req, res) => { // search result routing
  let { keyword } = req.query;
  let restaurantFiltered = [];
  Shop.find()
    .lean()
    .then((shops) => {
      for (let i = 0; i < shops.length; i++) {
        // 符合條件的 shops item 留下
        if ( shops[i].name.toLowerCase().includes(keyword.toLowerCase()) ) {
          restaurantFiltered.push(shops[i]);
        }
      }
    })
    .catch( e => console.log(e));
  
  // 再把 index 頁面用 restaurantFiltered routing 一次
  res.render('index', { restaurant: restaurantFiltered, keyword: keyword });  
})


app.get('/restaurants/:id', (req, res) => {// routing 個別餐廳頁面
  let id = Number(req.params.id);
  let shop;
  Shop.find()
    .lean()
    .then((shops) => {
      for (let i = 0; i < shops.length; i++) {
        // 符合條件的 shops item 留下
        if ( shops[i].shopId === id) {
          shop = shops[i];
        }
      }

      // show page routing
      res.render('show', { restaurant : shop});
    })
    .catch( e => console.log(e));
})

app.get('/createForm', (req, res) => {// routing 新增/更新頁面 createForm
  res.render('createForm');
})

app.post('/createForm/afterPost', (req, res) => {// routing post createForm 資料邏輯頁面並重定向至首頁
  const shop = req.body;   // 從 req.body 拿出表單裡的資料

  return Shop.create( shop )     // 存入資料庫 Shop
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error));
})

app.get('/restaurants/:id/edit', (req, res) => { // routing 編輯單筆餐廳頁面 
  const id = req.params.id;

  return Shop.findOne({ shopId: id })
    .lean()
    .then( shop => {
      res.render('edit', { shop });
    })
    .catch(error => console.log(error));
})

app.post('/edited/:id', (req, res) => { // routing post edit 資料邏輯頁面並重定向至首頁
  const id = req.params.id;
  const shop = req.body;

  return Shop.updateOne({ shopId: id }, shop)
    .then(
      () => res.redirect('/')
    )
    .catch(error => console.log(error));
})

app.get('/restaurants/:id/delete', (req, res) => { // routing delete function & redirect to index
  const id = req.params.id;

  return Shop.findOneAndDelete({ shopId: id })
    .then( (meg) => {
      console.log(`deleted object: ${meg}`);
    })
    .then( 
      () => res.redirect('/')
    )
    .catch(error => console.log(error));
})

// sever listen
app.listen(port, () => {
  console.log(`Server is listening in port ${port}.`);
})