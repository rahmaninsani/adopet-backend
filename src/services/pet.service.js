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

  static async createPet(pet, transaction) {
    const payload = {
      idOwner: pet.idOwner,
      name: pet.name,
      kind: pet.kind,
      age: pet.age,
      ageUnit: pet.ageUnit,
      gender: pet.gender,
      featherColor: pet.featherColor,
      weight: pet.weight,
      weightUnit: pet.weightUnit,
      photo: pet.photo,
      description: pet.description,
      status: pet.status,
    };

    const options = { transaction };

    return await super.create(payload, options);
  }
}

PetService.model = Pet;

module.exports = PetService;
