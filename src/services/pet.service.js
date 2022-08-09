const sequelize = require('sequelize');
const Service = require('./service');
const { Pet } = require('../models');
const { binToUUID } = require('../utils');

class PetService extends Service {
  static async findAllPet() {
    const options = {
      attributes: {
        exclude: ['id_owner'],
        include: [
          [binToUUID('id', 1), 'id'],
          [binToUUID('id_owner', 1), 'idOwner'],
        ],
      },
    };

    return await super.findAll(options);
  }

  static async createPet(user, transaction) {
    const hashedPassword = await hash(user.password);
    const payload = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      password: hashedPassword,
    };

    const options = { transaction };

    return await super.create(payload, options);
  }
}

PetService.model = Pet;

module.exports = PetService;
