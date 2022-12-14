const sequelize = require('sequelize');
const Service = require('./service');
const { Adopt, User } = require('../models');
const { binToUUID, uuidToBin } = require('../utils');

class AdoptService extends Service {
  static async findOneAdopt(idAdopter, idPet) {
    const options = {
      attributes: {
        exclude: ['id_adopter', 'id_pet'],
        include: [
          [binToUUID('id_adopter', 1), 'idAdopter'],
          [binToUUID('id_pet', 1), 'idPet'],
        ],
      },
      where: {
        idAdopter: {
          [sequelize.Op.eq]: uuidToBin(idAdopter, 1),
        },
        idPet: {
          [sequelize.Op.eq]: uuidToBin(idPet, 1),
        },
      },
    };
    return await super.findOne(options);
  }

  static async findAllAdopt(idPet) {
    const options = {
      attributes: [
        [binToUUID('id_adopter', 1), 'idAdopter'],
        [sequelize.col('User.name'), 'name'],
      ],
      include: [
        {
          model: User,
          as: 'User',
          attributes: [],
          required: true,
        },
      ],
      where: {
        idPet: {
          [sequelize.Op.eq]: uuidToBin(idPet, 1),
        },
      },
    };
    return await super.findAll(options);
  }

  static async createAdopt(pet, transaction) {
    const payload = {
      idAdopter: uuidToBin(pet.idAdopter, 1),
      idPet: uuidToBin(pet.idPet, 1),
    };

    const options = { transaction };

    return await super.create(payload, options);
  }

  static async deleteAdopt({ idAdopter, idPet }, transaction) {
    const options = {
      where: {
        idAdopter: {
          [sequelize.Op.eq]: uuidToBin(idAdopter, 1),
        },
        idPet: {
          [sequelize.Op.eq]: uuidToBin(idPet, 1),
        },
      },
      transaction,
    };

    return await super.delete(options);
  }

  static async updateForAdopted({ idAdopter, status }, transaction) {
    const payload = {
      status,
    };

    const options = {
      where: {
        idAdopter: {
          [sequelize.Op.eq]: uuidToBin(idAdopter, 1),
        },
      },
      transaction,
    };

    return await super.update(payload, options);
  }
}

AdoptService.model = Adopt;

module.exports = AdoptService;
