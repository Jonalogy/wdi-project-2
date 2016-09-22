'use strict';
module.exports = function(sequelize, DataTypes) {
  var variantpicture = sequelize.define('variantpicture', {
    variantPictureID: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    },
    variantID: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return variantpicture;
};
