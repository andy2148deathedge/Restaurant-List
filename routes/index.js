// import express & express.Router
const express = require('express');
const router = express.Router();

// routing
const home = require('./modules/home');
router.use('/', home);

const restaurants = require('./modules/restaurants');
router.use('/restaurants', restaurants);
// routing

// 匯出 router 至 wrapper　層
module.exports = router;