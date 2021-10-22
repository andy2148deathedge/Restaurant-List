const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

module.exports = app => {
  // passport 模組初始化
  app.use(passport.initialize()); 
  app.use(passport.session()); 

  // 設定 local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'That email is mot registered!' });
        }
        return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect.'});
          } 
          return done(null, user);
        })
        .catch(err => done(err, false));
      })
  }));

  // 設定 serialize/deserialize 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
};


