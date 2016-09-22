'use strict';
module.exports = function(sequelize, DataTypes) {
  var brand = sequelize.define('brand', {
    brandID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    brandName: DataTypes.STRING,
    brandCountry: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.brand.hasMany(models.product, {foreignKey: 'brandID'});
      }
    }
  });
  return brand;
};
