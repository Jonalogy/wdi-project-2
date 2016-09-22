var express = require('express');
var db = require('../models');
var passport = require('../config/passport.js');
var router = express.Router();

router.get('/', function(req, res) {
  db.product.findAll({include:[{model: db.brand},{model: db.productpicture}]}).then(function(products) {
    res.render('product/view.ejs',{products:products});
  });
});

router.get('/brandCountry', function(req, res) {
  db.brand.find({attributes: ['brandCountry']}).then(function(brandData) {
    res.send(brandData);
  });
});

router.get('/autocomplete/:brandName/productName', function(req, res) {
  req.params.brandName = req.params.brandName.replace(/---/g, " % ");
  req.params.brandName = req.params.brandName.replace(/-/g, " ");
  req.params.brandName = req.params.brandName.replace(/%/g, "-");
  console.log(req.params.brandName);
  db.brand.find({where:{brandName:req.params.brandName}}).then(function(brand) {
    db.product.findAll({where:{brandID:brand.brandID},attributes: ['productName']}).then(function(productData) {
      res.send(productData);
    });
  });
});

router.get('/:brandName', function(req, res) {
  req.params.brandName = req.params.brandName.replace(/---/g, " % ");
  req.params.brandName = req.params.brandName.replace(/-/g, " ");
  req.params.brandName = req.params.brandName.replace(/%/g, "-");
  db.brand.find({where:{brandName:req.params.brandName}}).then(function(brand) {
    db.product.findAll({where:{brandID:brand.brandID},include:[{model: db.brand},{model: db.productpicture}]}).then(function(products) {
      console.log(products);
      res.render('product/view.ejs',{products:products});
    });
  });
});

router.get('/:brandName/:productName', function(req, res) {
  req.params.productName = req.params.productName.replace(/---/g, " % ");
  req.params.productName = req.params.productName.replace(/-/g, " ");
  req.params.productName = req.params.productName.replace(/%/g, "-");
  db.brand.find({where:{brandName:req.params.brandName}}).then(function(brand) {
    db.product.find({where:{productName:req.params.productName}}).then(function(product) {
      db.productpicture.findAll({where:{productID:product.productID}}).then(function(productPictures) {
        db.variant.findAll({where:{productID:product.productID},include:[{model: db.product}]}).then(function(variants) {
          res.render('product/viewProduct.ejs',{brandName:req.params.brandName,productName:product.productName,productDescription:product.productDescription,productPictures:productPictures,variants:variants});
        });
      });
    });
  });
});

module.exports = router;
