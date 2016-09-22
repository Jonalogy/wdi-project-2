var passport = require('passport');
var localpassport = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
  cb(null, user.userid);
});

passport.deserializeUser(function(userid, cb) {
  db.user.findById(userid).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

var fields = {usernameField: 'email', passwordField: 'password'};
var locallogin = new localpassport(fields, function(username, password, cb) {
  username = username.toLowerCase();
  db.user.find({
    where: { email: username, status: "active" }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch( function(err){
    cb(err);
  });
});

passport.use(locallogin);

// export the Passport configuration from this module
module.exports = passport;
