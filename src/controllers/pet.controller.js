const { sequelize } = require('../models');
const { PetService } = require('../services');

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

  static async add(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { email } = req.user;
      const formData = new FormData();
      const foodNutritions = [];
      const { buffer } = req.file;
      formData.append('file', buffer, 'food.jpg');

      const { data } = await NutritionApiService.getNutritionByImage(formData);
      let foodName = data.category.name;
      const nutritions = data.nutrition;

      foodName = foodName[0].toUpperCase().concat(foodName.slice(1));
      await FoodDbService.createFood({ name: foodName }, transaction);

      const { id: idUser } = await UserDbService.findOneUserByEmail(email);
      const { id: idFood } = await FoodDbService.findLastInsertedRow(transaction);

      await Promise.all(
        Object.entries(nutritions).map(async ([key, values]) => {
          if (key === 'recipesUsed') return;

          const name = key[0].toUpperCase().concat(key.slice(1));
          const weight = values.value;
          const unit = values.unit === 'calories' ? 'kcal' : values.unit;

          const data = {
            name,
            weight,
            unit,
          };

          foodNutritions.push(data);

          const payload = {
            idUser,
            idFood,
            ...data,
          };

          await NutritionDbService.createNutrition(payload, transaction);
        })
      );

      await transaction.commit();

      const { id: uuidFood } = await FoodDbService.findOneFood({ idFood });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          id: uuidFood,
          foodName,
          foodNutritions,
        },
      });
    } catch (error) {
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
