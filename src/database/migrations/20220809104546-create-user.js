'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('(UUID_TO_BIN(UUID(), 1))'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      phoneNumber: {
        allowNull: false,
        field: 'phone_number',
        type: Sequelize.STRING(16),
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.CHAR(72),
      },
      profilePhoto: {
        allowNull: false,
        defaultValue: 'avatar.png',
        field: 'profile_photo',
        type: Sequelize.STRING(100),
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
