'use strict';
module.exports = function(sequelize, DataTypes) {
  var productpicture = sequelize.define('productpicture', {
    productPictureID: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    },
    productID: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.productpicture.belongsTo(models.product, {foreignKey: 'productID'});
      }
    }
  });
  return productpicture;
};
