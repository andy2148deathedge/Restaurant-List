const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const db = require('../../config/mongoose');
const User = require('../user');
const Shop = require('../shop');
const restaurant = require('./restaurant.json');

const seedUsers = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  shopId: [1, 2, 3]
}, 
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  shopId: [4, 5, 6]
}];

const restaurantInfo = restaurant.results;

db.once('open', () => {
  console.log('mongodb connected');

  // 這邊要從 restaurant.json 引入餐廳資料
  Promise.all(seedUsers.map(seedUser =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        // 從restaurant_data中篩選出含有在SEED_USER的restaurantsID中的餐廳
        const shops = restaurantInfo.filter(shop => seedUser.shopId.includes(shop.id))
        // 將選出的餐廳，設定他們的userId是user資料庫所產生的id
        shops.forEach(shop => { shop.userId = user._id })
        return Shop.create(shops);
      })
  ))
  .then(() => {
    console.log('done');
    process.exit();
  })
  .catch(err => console.log(err));
});

