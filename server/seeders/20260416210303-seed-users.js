'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [{
      name: 'Admin Master',
      email: 'master@mail.com',
      password: hashedPassword,
      role: 'master',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
