'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    productID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    productName: DataTypes.STRING,
    productDescription: DataTypes.TEXT,
    brandID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.product.belongsTo(models.brand, {foreignKey: 'brandID'});
        models.product.hasMany(models.variant, {foreignKey: 'productID'});
        models.product.hasMany(models.productpicture, {foreignKey: 'productID'});
      }
    }
  });
  return product;
};
