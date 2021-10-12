const mongoose = require('mongoose');
const Shop = require('../shop');
const restaurant = require('../../restaurant.json');

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error');
})

db.once('open', () => {
  console.log('mongodb connected');

  // 這邊要從 restaurant.json 引入餐廳資料
  restaurant.results.forEach(shop => {
    Shop.create({
      shopId: shop.id,
      name: shop.name,
      name_en: shop.name_en,
      category: shop.category,
      image: shop.image,  
      location: shop.location,
      phone: shop.phone,
      google_map: shop.google_map,
      rating: shop.rating,
      description: shop.description,
    })
  })

  //
  console.log('done');
})

