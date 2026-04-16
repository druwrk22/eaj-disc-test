'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      pilihan_paling: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
      },
      pilihan_kurang: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_responses');
  }
};
