const { sequelize } = require('../models');
const { PetService, UserService } = require('../services');

class PetController {
  static async getAll(req, res) {
    try {
      const pets = await PetService.findAllPet();

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
      const { idPet } = req.params;
      const pet = await PetService.findOnePetById(idPet);

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: { pet },
      });
    } catch (error) {
      res.sendStatus(500).end();
    }
  }

  static async add(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { email } = req.user;
      const { id: idOwner } = await UserService.findOneUserByEmail(email);

      await PetService.createPet({ idOwner, ...req.body }, transaction);
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

      await PetService.updatePet({ oldData: pet, newData: req.body }, transaction);
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
      const { idFood } = req.params;
      const { email } = req.user;
      const { id: idUser } = await UserDbService.findOneUserByEmail(email);

      const deleteNutrition = await NutritionDbService.deleteNutrition({ idUser, idFood }, transaction);
      if (deleteNutrition < 1) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Food Nutrition Not Found',
        });
      }

      await FoodDbService.deleteFood({ idFood }, transaction);
      await transaction.commit();

      res.status(204).json({
        code: res.statusCode,
        status: 'No Content',
      });
    } catch (error) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }
}

module.exports = PetController;
