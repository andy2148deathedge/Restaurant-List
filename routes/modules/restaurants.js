const express = require('express');
const router = express.Router();

// routing
const Shop = require('../../models/shop');

router.get('/search', (req, res) => { // search result routing
  const userId = req.user._id;
  const { keyword } = req.query;
  const restaurantFiltered = [];

  Shop.find({ userId })
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
});

router.get('/create', (req, res) => {// routing 新增/更新頁面 createForm
  res.render('createForm');
});

router.get('/:id', (req, res) => {// routing 個別餐廳頁面
  const userId = req.user._id;
  const _id = req.params.id;

  return  Shop.findOne({ _id, userId })
    .lean() 
    .then((shop) => res.render('show', { restaurant : shop}))
    .catch((err) => console.log(err));
});

router.post('/', (req, res) => {// routing post createForm 資料邏輯頁面並重定向至首頁
  const shop = req.body;   // 從 req.body 拿出表單裡的資料
  shop.userId = req.user._id; // 新增 建立者id userId屬性
  
  return Shop.create( shop )     // 存入資料庫 Shop
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error));
});

router.get('/:id/edit', (req, res) => { // routing 編輯單筆餐廳頁面 
  const _id = req.params.id;

  return Shop.findOne({ _id })
    .lean()
    .then( shop => {
      res.render('edit', { shop });
    })
    .catch(error => console.log(error));
});

router.put('/:id', (req, res) => { // routing post edit 資料邏輯頁面並重定向至首頁
  const _id = req.params.id;
  const shop = req.body;
  shop.userId = req.user._id;

  return Shop.updateOne({ shopId: _id }, shop)
    .then(
      () => res.redirect('/')
    )
    .catch(error => console.log(error));
});

router.delete('/:id', (req, res) => { // routing delete function & redirect to index
  const _id = req.params.id;

  return Shop.findOneAndDelete({ _id })
    .then( (meg) => {
      console.log(`deleted object: ${meg}`);
    })
    .then( 
      () => res.redirect('/')
    )
    .catch(error => console.log(error));
});
//routing

module.exports = router;