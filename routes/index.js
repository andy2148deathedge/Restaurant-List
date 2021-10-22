// import express & express.Router
const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const restaurants = require('./modules/restaurants');
const users = require('./modules/users');

const { authenticator } = require('../middleware/auth');

// routing
router.use('/restaurants', authenticator, restaurants);
router.use('/users', users);
router.use('/', authenticator, home);

// 匯出 router 至 wrapper　層
module.exports = router;