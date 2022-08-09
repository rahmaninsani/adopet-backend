'use strict';

const { hash } = require('../../utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    const preparedData = [
      {
        name: 'Owner',
        phone_number: '+628123456789',
        address: 'Bandung, Indonesia',
        email: 'owner@gmail.com',
        password: await hash('owner'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Adopter',
        phone_number: '+628123456789',
        address: 'Jakarta, Indonesia',
        email: 'adopter@gmail.com',
        password: await hash('adopter'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    return queryInterface.bulkInsert('user', [...preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  },
};
