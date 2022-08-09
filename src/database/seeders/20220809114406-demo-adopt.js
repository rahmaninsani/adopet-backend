'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const adopter = await queryInterface.sequelize.query(`SELECT * FROM user WHERE email = 'adopter@gmail.com';`);
    const pet = await queryInterface.sequelize.query(`SELECT * FROM pet WHERE name = 'Molly';`);

    const preparedData = {
      id_adopter: adopter[0][0].id,
      id_pet: pet[0][0].id,
      status: 'Pending',
      created_at: new Date(),
      updated_at: new Date(),
    };
    return queryInterface.bulkInsert('adopt', [preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('adopt', null, {});
  },
};
