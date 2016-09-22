'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('brands', {
      brandID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      brandName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brandCountry: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('brands');
  }
};
