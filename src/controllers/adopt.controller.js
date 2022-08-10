const { sequelize } = require('../models');
const { UserService, PetService, AdoptService } = require('../services');

class AdoptController {
  static async add(req, res) {
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

      if (user.id === pet.idOwner) {
        return res.status(403).json({
          code: res.statusCode,
          status: 'Same Owner',
        });
      }

      const isAdopted = await AdoptService.findOneAdopt(user.id, pet.id);

      if (isAdopted) {
        return res.status(403).json({
          code: res.statusCode,
          status: `Already Adopted with Status ${isAdopted.status}`,
        });
      }

      await AdoptService.createAdopt({ idAdopter: user.id, idPet: pet.id }, transaction);
      await transaction.commit();

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
      });
    } catch (error) {
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

module.exports = AdoptController;
