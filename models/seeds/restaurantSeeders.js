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
        const shops = restaurantInfo.filter(shop => seedUser.shopId.includes(shop.id))
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

