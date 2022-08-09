const { sequelize } = require('../models');
const { UserService } = require('../services');
const { compare, generateAccessToken } = require('../utils');

class AuthController {
  static async signup(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { name, phoneNumber, address, email, password } = req.body;
      const user = await UserService.findOneUserByEmail(email);

      if (user) {
        return res.status(400).json({
          code: res.statusCode,
          status: 'Email is Already Registered',
        });
      }

      await UserService.createUser({ name, phoneNumber, address, email, password }, transaction);
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

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findOneUserByEmail(email);

      if (user === null) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Email Not Found',
        });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          code: res.statusCode,
          status: 'Invalid Password',
        });
      }

      const accessToken = generateAccessToken({ email: user.email });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          email: user.email,
          accessToken,
        },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }
}

module.exports = AuthController;
