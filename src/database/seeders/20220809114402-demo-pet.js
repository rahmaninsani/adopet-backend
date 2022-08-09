'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const owner = await queryInterface.sequelize.query(`SELECT * FROM user WHERE email = 'owner@gmail.com';`);

    const preparedData = {
      id_owner: owner[0][0].id,
      name: 'Molly',
      age: 1,
      age_unit: 'Years',
      gender: 'Female',
      feather_color: 'Gray',
      weight: 4,
      weight_unit: 'kg',
      description: 'This is a cute cat ever',
      status: 'Available',
      created_at: new Date(),
      updated_at: new Date(),
    };
    return queryInterface.bulkInsert('pet', [preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pet', null, {});
  },
};
