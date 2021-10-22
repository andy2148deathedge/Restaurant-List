const express = require('express');
const router = express.Router();

// routing
const Shop = require('../../models/shop');

router.get('/', (req, res) => { // index routing
  // 拿 collection Shop 的資料
  Shop.find({ userId: req.user._id })
    .lean()
    .sort({ _id: 'asc'}) // asc <=> desc 
    .then((shops) => {
      res.render('index', { restaurant: shops })
    })
    .catch( e => console.log(e));
});
// routing


module.exports = router;