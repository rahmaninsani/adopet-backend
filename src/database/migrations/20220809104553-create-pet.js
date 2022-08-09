'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pet', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('(UUID_TO_BIN(UUID(), 1))'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      idOwner: {
        allowNull: false,
        field: 'id_owner',
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      kind: {
        allowNull: false,
        type: Sequelize.ENUM('Dog', 'Cat'),
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ageUnit: {
        allowNull: false,
        field: 'age_unit',
        type: Sequelize.ENUM('Days', 'Months', 'Years'),
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('Male', 'Female'),
      },
      featherColor: {
        allowNull: false,
        field: 'feather_color',
        type: Sequelize.ENUM('Black', 'White', 'Orange', 'Gray', 'Brown'),
      },
      weight: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      weightUnit: {
        allowNull: false,
        field: 'weight_unit',
        type: Sequelize.ENUM('g', 'kg'),
      },
      photo: {
        allowNull: false,
        defaultValue: 'photo.png',
        type: Sequelize.STRING(100),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('Available', 'Adopted'),
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
    await queryInterface.dropTable('pet');
  },
};
