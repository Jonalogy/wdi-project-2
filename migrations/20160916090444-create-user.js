'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      userid: { //Values: USER00000001, USER00000002 ...
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true
      },
      email: { //Email must be unique among active status accounts
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      usertype: { //Values: guest, normal, admin, super
        type: Sequelize.STRING,
        allowNull: false
      },
      status: { //Values: active, deleted
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "active"
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
    return queryInterface.dropTable('users');
  }
};
