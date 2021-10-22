// import express & express.Router
const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const restaurants = require('./modules/restaurants');
const users = require('./modules/users');

// routing
router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/users', users);
// routing

// 匯出 router 至 wrapper　層
module.exports = router;