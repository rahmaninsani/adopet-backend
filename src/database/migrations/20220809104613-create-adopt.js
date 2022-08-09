'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adopt', {
      idAdopter: {
        allowNull: false,
        field: 'id_adopter',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      idPet: {
        allowNull: false,
        field: 'id_pet',
        primaryKey: true,
        references: {
          model: 'pet',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      status: {
        allowNull: false,
        defaultValue: 'Pending',
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
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
    await queryInterface.dropTable('adopt');
  },
};
