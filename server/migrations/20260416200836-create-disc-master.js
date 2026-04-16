'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('disc_master', {
      nomor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      pilihan_teks: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      kategori: {
        type: Sequelize.CHAR(1),
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('disc_master');
  }
};
