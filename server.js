var express = require('express');  //Node.js framework to help with routing and templating
var ejsLayouts = require('express-ejs-layouts');  //Enable the use of ejs layouts
var bodyParser = require('body-parser');  //Attaches data to body.req to make it readily available for manipulation
var cors = require('cors'); //Enable cross server requests
var dotenv = require('dotenv').config();
var db = require('./models'); //Enable use of sequelize to query database
var session = require('express-session'); //Enable the use of express session
var passport = require('./config/passport.js'); //Enable the use of passports by referring to config/passport.js
var flash = require('connect-flash'); //Enable flash messages
var app = express();
// var cloudinary = require('cloudinary');


app.use(express.static(__dirname + '/public'));  //Look in public folder for static files
app.use(express.static(__dirname + '/public/css'));
app.use(ejsLayouts);  //Initialize the use of ejsLayouts
app.use(cors());  //Initialize the use of cors
app.use(bodyParser.json()); //Support json-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))  //Support url-encoded bodies such as data encoded using serialize()
app.use(session({
  secret: 'kamikazenoodles',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize()); //Initialize passport configuration
app.use(passport.session());  //Support use of passport sessions
app.use(flash());
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user; //currentUser details get saved in currentUser object
  next();
});

app.set('view engine','ejs'); //Use ejs for templates
app.set('views','./templates'); //Will now look for ejs files in templates folder





app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/allTheBrands', function(req, res) {
  db.brand.findAll({order: '"brandName"'}).then(function(brands) {
    res.send(brands);
  });
});


app.get('/unauthorized', function(req, res) {
  res.render('unauthorized.ejs');
});

app.post('/register', function(req, res) {
  db.user.max('userid').then(function(max) {
    var newUserid = incrementId(max);
    req.body.email = req.body.email.toLowerCase(); //Changing to lower case before saving into table
    var entry = {
      where: { email: req.body.email, status: 'active'},
      defaults: {
        userid: newUserid,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        usertype: "normal"
      }
    };
    db.user.findOrCreate(entry).spread(function(user, created) {
      if(created) {
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Account created and signed in'
        })(req, res);
      }
      else {
        req.flash('error', 'Email already exists');
        res.redirect('/');
      }
    });
  });
});

app.use('/', require('./routes/signin.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/product', require('./routes/product.js'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

function incrementId(id) {
  if(id!=null) {
    id = "00000000" + (parseInt(id.replace("USER",""),10) + 1);
    id = "USER" + id.substr(id.length-8);
    return id;
  }
  else {
    id = "USER00000000";
    return id;
  }
}
