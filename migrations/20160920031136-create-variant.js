'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('variants', {
      variantID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      variantName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sellingPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(19,4)
      },
      productID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brandCountryRetailPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(19,4)
      },
      singaporeRetailPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(19,4)
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      saleAvailability: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('variants');
  }
};
