const sequelize = require('sequelize');
const Service = require('./service');
const { Pet } = require('../models');
const { binToUUID, uuidToBin } = require('../utils');

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

  static async findAllFilter(filter) {
    const options = {
      attributes: {
        exclude: ['id_owner'],
        include: [
          [binToUUID('id', 1), 'id'],
          [binToUUID('id_owner', 1), 'idOwner'],
        ],
      },
      where: {
        ...filter,
      },
    };

    return await super.findAll(options);
  }

  static async findOnePetById(id) {
    const options = {
      attributes: {
        exclude: ['id_owner'],
        include: [
          [binToUUID('id', 1), 'id'],
          [binToUUID('id_owner', 1), 'idOwner'],
        ],
      },
      where: {
        id: {
          [sequelize.Op.eq]: uuidToBin(id, 1),
        },
      },
    };
    return await super.findOne(options);
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

  static async updatePet({ oldData, newData }, transaction) {
    const payload = {
      name: newData?.name || oldData?.name,
      kind: newData?.kind || oldData?.kind,
      age: newData?.age || oldData?.age,
      ageUnit: newData?.ageUnit || oldData?.ageUnit,
      gender: newData?.gender || oldData?.gender,
      featherColor: newData?.featherColor || oldData?.featherColor,
      weight: newData?.weight || oldData?.weight,
      weightUnit: newData?.weightUnit || oldData?.weightUnit,
      photo: newData?.photo || oldData?.photo,
      description: newData?.description || oldData?.description,
      status: newData?.status || oldData?.status,
    };

    const options = {
      where: {
        id: {
          [sequelize.Op.eq]: uuidToBin(oldData.id, 1),
        },
        idOwner: {
          [sequelize.Op.eq]: uuidToBin(oldData.idOwner, 1),
        },
      },
      transaction,
    };

    return await super.update(payload, options);
  }

  static async deletePet(id, transaction) {
    const options = {
      where: {
        id: {
          [sequelize.Op.eq]: uuidToBin(id, 1),
        },
      },
      transaction,
    };

    return await super.delete(options);
  }
}

PetService.model = Pet;

module.exports = PetService;
