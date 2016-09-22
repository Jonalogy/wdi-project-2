'use strict';
module.exports = function(sequelize, DataTypes) {
  var variant = sequelize.define('variant', {
    variantID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    variantName: DataTypes.STRING,
    size: DataTypes.STRING,
    sellingPrice: DataTypes.DECIMAL(19,4),
    productID: DataTypes.STRING,
    brandCountryRetailPrice: DataTypes.DECIMAL(19,4),
    singaporeRetailPrice: DataTypes.DECIMAL(19,4),
    weight: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    saleAvailability: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.variant.belongsTo(models.product, {foreignKey: 'productID'});
      }
    }
  });
  return variant;
};
