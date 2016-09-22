var express = require('express');
var db = require('../models');
var passport = require('../config/passport.js');
var router = express.Router();
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });


router.use(function(req, res, next) {
  if (!req.user || (req.user.dataValues.usertype!="super" && req.user.dataValues.usertype!="admin")) {
    req.flash('error', 'You are not authorized to access this page. Please sign in if you have yet to do so.');
    res.redirect('/unauthorized');
  } else {
    next();
  }
});


router.get('/add', function(req, res) {
  db.brand.findAll({order: '"brandName"'}).then(function(brands) {
    res.render('product/add.ejs',{brands:brands});
  });
});

//Route: Adding products - if (new brand) add brand then add product, else add product
router.post('/add', upload.single('myFile'), function(req, res) {
  db.brand.max('brandID').then(function(max) {
    var newBrandID = incrementBrandID(max);
    var entry = {
      where: { brandName: req.body.brandName},
      defaults: {
        brandID: newBrandID,
        brandCountry: req.body.brandCountry
      }
    };
    //Add brand
    db.brand.findOrCreate(entry).spread(function(brand, created) {
      if(created) {
        req.flash('success', 'Brand ' + brand.brandName + ' added.');
        db.product.max('productID').then(function(max) {
          var newProductID = incrementProductID(max);
          entry = {
            where: { productName: req.body.productName},
            defaults: {
              productID: newProductID,
              productDescription: req.body.productDescription,
              brandID: brand.brandID
            }
          };
          db.product.findOrCreate(entry).spread(function(product, created) {
            if(created) {
              req.flash('success', 'Product ' + product.productName + ' added.');
              var imageFilename = spaceToHyphen(product.productName);
              db.productpicture.max('productPictureID').then(function(max) {
                var newProductPictureID = incrementProductPictureID(max);
                cloudinary.uploader.upload(req.file.path, function(result) {
                  db.productpicture.findOrCreate({
                    where: {productID: product.productID},
                    defaults: {
                      productPictureID: newProductPictureID,
                      url: result.url
                    }
                  }).spread(function(productpicture, created) {
                    db.variant.max('variantID').then(function(max) {
                      var newVariantID = incrementVariantID(max);
                      entry = {
                        where: {
                          variantName: req.body.variantName,
                          productID: product.productID
                        },
                        defaults: {
                          variantID: newVariantID,
                          size: req.body.size,
                          sellingPrice: req.body.sellingPrice,
                          productID: product.productID,
                          brandCountryRetailPrice: req.body.brandCountryRetailPrice,
                          singaporeRetailPrice: req.body.singaporeRetailPrice,
                          weight: req.body.weight,
                          stock: req.body.stock,
                          saleAvailability: req.body.saleAvailability
                        }
                      };
                      db.variant.findOrCreate(entry).spread(function(variant, created) {
                        if(created) {
                          req.flash('success', 'Variant ' + variant.variantName + ' added.');
                          res.redirect('/admin/add');
                        }
                        else {
                          req.flash('error', 'Variant exists.');
                          res.redirect('/admin/add');
                        }
                      });
                    });
                  });
                }, {public_id: imageFilename});
              });
            }
            else {
              db.variant.max('variantID').then(function(max) {
                var newVariantID = incrementVariantID(max);
                entry = {
                  where: {
                    variantName: req.body.variantName,
                    productID: product.productID
                  },
                  defaults: {
                    variantID: newVariantID,
                    size: req.body.size,
                    sellingPrice: req.body.sellingPrice,
                    productID: product.productID,
                    brandCountryRetailPrice: req.body.brandCountryRetailPrice,
                    singaporeRetailPrice: req.body.singaporeRetailPrice,
                    weight: req.body.weight,
                    stock: req.body.stock,
                    saleAvailability: req.body.saleAvailability
                  }
                };
                db.variant.findOrCreate(entry).spread(function(variant, created) {
                  if(created) {
                    req.flash('success', 'Variant ' + variant.variantName + ' added.');
                    res.redirect('/admin/add');
                  }
                  else {
                    req.flash('error', 'Variant exists.');
                    res.redirect('/admin/add');
                  }
                });
              });
            }
          });
        });
      }
      else {
        db.product.max('productID').then(function(max) {
          var newProductID = incrementProductID(max);
          entry = {
            where: { productName: req.body.productName},
            defaults: {
              productID: newProductID,
              productDescription: req.body.productDescription,
              brandID: brand.brandID
            }
          };
          db.product.findOrCreate(entry).spread(function(product, created) {
////////////////////////////
            if(created) {
              req.flash('success', 'Product ' + product.productName + ' added.');
              var imageFilename = spaceToHyphen(product.productName);
              db.productpicture.max('productPictureID').then(function(max) {
                var newProductPictureID = incrementProductPictureID(max);
                cloudinary.uploader.upload(req.file.path, function(result) {
                  db.productpicture.findOrCreate({
                    where: {productID: product.productID},
                    defaults: {
                      productPictureID: newProductPictureID,
                      url: result.url
                    }
                  }).spread(function(productpicture, created) {
                    db.variant.max('variantID').then(function(max) {
                      var newVariantID = incrementVariantID(max);
                      entry = {
                        where: {
                          variantName: req.body.variantName,
                          productID: product.productID
                        },
                        defaults: {
                          variantID: newVariantID,
                          size: req.body.size,
                          sellingPrice: req.body.sellingPrice,
                          productID: product.productID,
                          brandCountryRetailPrice: req.body.brandCountryRetailPrice,
                          singaporeRetailPrice: req.body.singaporeRetailPrice,
                          weight: req.body.weight,
                          stock: req.body.stock,
                          saleAvailability: req.body.saleAvailability
                        }
                      };
                      db.variant.findOrCreate(entry).spread(function(variant, created) {
                        if(created) {
                          req.flash('success', 'Variant ' + variant.variantName + ' added.');
                          res.redirect('/admin/add');
                        }
                        else {
                          req.flash('error', 'Variant exists.');
                          res.redirect('/admin/add');
                        }
                      });
                    });
                  });
                }, {public_id: imageFilename});
              });
            }
            else {
              db.variant.max('variantID').then(function(max) {
                var newVariantID = incrementVariantID(max);
                entry = {
                  where: {
                    variantName: req.body.variantName,
                    productID: product.productID
                  },
                  defaults: {
                    variantID: newVariantID,
                    size: req.body.size,
                    sellingPrice: req.body.sellingPrice,
                    productID: product.productID,
                    brandCountryRetailPrice: req.body.brandCountryRetailPrice,
                    singaporeRetailPrice: req.body.singaporeRetailPrice,
                    weight: req.body.weight,
                    stock: req.body.stock,
                    saleAvailability: req.body.saleAvailability
                  }
                };
                db.variant.findOrCreate(entry).spread(function(variant, created) {
                  if(created) {
                    req.flash('success', 'Variant ' + variant.variantName + ' added.');
                    res.redirect('/admin/add');
                  }
                  else {
                    req.flash('error', 'Variant exists.');
                    res.redirect('/admin/add');
                  }
                });
              });
            }
          });
        });
      }
    });
  });
});

router.get('/edit/product/:brandName/:productName/:variantName', function(req, res) {
  req.params.productName = req.params.productName.replace(/---/g, " % ");
  req.params.productName = req.params.productName.replace(/-/g, " ");
  req.params.productName = req.params.productName.replace(/%/g, "-");

  req.params.variantName = req.params.variantName.replace(/QXQX---/g, "#");
  req.params.variantName = req.params.variantName.replace(/---/g, " % ");
  req.params.variantName = req.params.variantName.replace(/-/g, " ");
  req.params.variantName = req.params.variantName.replace(/%/g, "-");
  if(req.params.variantName == ' ') req.params.variantName = '-';
  db.brand.find({where:{brandName:req.params.brandName}}).then(function(brand) {
    db.product.find({where:{productName:req.params.productName}}).then(function(product) {
      db.productpicture.findAll({where:{productID:product.productID}}).then(function(productPictures) {
        db.variant.find({where:{productID:product.productID,variantName:req.params.variantName},include:[{model: db.product}]}).then(function(variant) {
          db.brand.findAll({order: '"brandName"'}).then(function(brands) {
            res.render('product/add.ejs',{edit:true,brand:brand,brands:brands,brandName:req.params.brandName,productName:product.productName,productDescription:product.productDescription,variantName:req.params.variantName,productPictures:productPictures,variant:variant});
          });
        });
      });
    });
  });
});





router.get('/stock', function(req, res) {
  db.variant.findAll({order:'"product.brand.brandName"',include:[{model: db.product, include:[db.brand]}]}).then(function(variants) {
    res.render('product/stock.ejs',{variants:variants});
  });
});

router.post('/stock', function(req, res) {
  for(var key in req.body) {
    db.variant.update({stock: req.body[key]},{where:{variantID:key}}).then(function(entry){
      console.log("Update successful");
    }).catch(function(error){
      console.log("Error");
    });
  }
  res.redirect('/admin/stock');
});


function incrementBrandID(id) {
  if(id!=null) {
    id = "00000000" + (parseInt(id.replace("BRAND",""),10) + 1);
    id = "BRAND" + id.substr(id.length-7);
    return id;
  }
  else {
    id = "BRAND0000001";
    return id;
  }
}

function incrementProductID(id) {
  if(id!=null) {
    id = "000000" + (parseInt(id.replace("PDTGRP",""),10) + 1);
    id = "PDTGRP" + id.substr(id.length-6);
    return id;
  }
  else {
    id = "PDTGRP000001";
    return id;
  }
}

function incrementVariantID(id) {
  if(id!=null) {
    id = "000000000" + (parseInt(id.replace("PDT",""),10) + 1);
    id = "PDT" + id.substr(id.length-9);
    return id;
  }
  else {
    id = "PDT000000001";
    return id;
  }
}

function incrementProductPictureID(id) {
  if(id!=null) {
    id = "00000000" + (parseInt(id.replace("PPIC",""),10) + 1);
    id = "PPIC" + id.substr(id.length-8);
    return id;
  }
  else {
    id = "PPIC00000001";
    return id;
  }
}

function spaceToHyphen(string) {
  return string.replace(/ /g,'-');
}

module.exports = router;
