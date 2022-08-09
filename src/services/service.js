class Service {
  static model;

  static async findOne(options) {
    return await this.model.findOne({ raw: true, ...options });
  }

  static async findLastInsertedRow(transaction = null) {
    return await this.model.findOne({
      raw: true,
      order: [['id', 'DESC']],
      transaction,
    });
  }

  static async create(payload, options) {
    return await this.model.create(payload, options);
  }

  static async delete(options) {
    return await this.model.destroy(options);
  }
}

module.exports = Service;
