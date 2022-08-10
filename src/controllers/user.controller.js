const { sequelize } = require('../models');
const { UserService, PetService, AdoptService } = require('../services');

class UserController {
  static async getAll(req, res) {
    try {
      const { email } = req.user;
      const { id } = await UserService.findOneUserByEmail(email);
      const pets = await PetService.findAllPetUser(id);

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: { pets },
      });
    } catch (error) {
      res.sendStatus(500).end();
    }
  }

  static async getDetail(req, res) {
    try {
      const { email } = req.user;
      const { id: idOwner } = await UserService.findOneUserByEmail(email);

      const { idPet } = req.params;
      const pet = await PetService.findOnePetUser(idPet, idOwner);

      if (pet === null) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Pet Not Found',
        });
      }

      const adopters = await AdoptService.findAllAdopt(pet.id);

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: {
          pet,
          adopters,
        },
      });
    } catch (error) {
      res.sendStatus(500).end();
    }
  }

  static async update(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { idPet } = req.params;
      const pet = await PetService.findOnePetById(idPet);

      if (!pet) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Pet Not Found',
        });
      }

      const { email } = req.user;
      const user = await UserService.findOneUserByEmail(email, true);

      if (user.id !== pet.idOwner) {
        return res.status(403).json({
          code: res.statusCode,
          status: 'Different Owner',
        });
      }

      const { idAdopter } = req.params;

      const adopters = await AdoptService.findAllAdopt(pet.id);

      await Promise.all(
        adopters.map(async (adopter) => {
          let status = 'Rejected';

          if (adopter.idAdopter === idAdopter) {
            status = 'Accepted';
          }

          await AdoptService.updateForAdopted({ idAdopter, status }, transaction);
        })
      );

      await PetService.updatePetForAdopted(idPet, transaction);
      await transaction.commit();

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
      });
    } catch (err) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }

  static async delete(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { idPet } = req.params;
      const pet = await PetService.findOnePetById(idPet);

      const { email } = req.user;
      const user = await UserService.findOneUserByEmail(email, true);

      const isAdopted = await AdoptService.findOneAdopt(user.id, pet.id);

      if (!isAdopted) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Adopt Pet History Not Found',
        });
      }

      await AdoptService.deleteAdopt({ idAdopter: user.id, idPet: pet.id }, transaction);
      await transaction.commit();

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
      });
    } catch (err) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }
}

module.exports = UserController;
