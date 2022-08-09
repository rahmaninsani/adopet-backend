const Service = require('./service');
const { User } = require('../models');
const { hash } = require('../utils');

const { binToUUID } = require('../utils');

class UserService extends Service {
  static async findOneUserByEmail(email, isUuid = false) {
    const options = {
      where: {
        email,
      },
    };
    if (isUuid) {
      options.attributes = {
        include: [[binToUUID('id', 1), 'id']],
      };
    }

    return await super.findOne(options);
  }

  static async createUser(user, transaction) {
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

UserService.model = User;

module.exports = UserService;
