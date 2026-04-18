'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_responses', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'id', 
      references: {
        model: 'users', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('user_responses', ['user_id'], {
      name: 'idx_user_responses_user_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('user_responses', 'idx_user_responses_user_id');
    await queryInterface.removeColumn('user_responses', 'user_id');
  }
};
