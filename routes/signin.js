var express = require('express');
var db = require('../models');
var passport = require('../config/passport.js');
var router = express.Router();

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have signed in'
}));

router.get('/signout', function(req, res) {
  req.logout();
  req.flash('success','Log out completed')
  res.redirect('/');
});

module.exports = router;
