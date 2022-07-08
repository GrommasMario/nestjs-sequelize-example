'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        validate: {
          isUUID: 4,
        }
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      passwordHash: {
        type: Sequelize.DataTypes.TEXT,
      },
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('users');
  }
};
