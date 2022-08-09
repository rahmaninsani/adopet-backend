'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Pet, {
        foreignKey: 'id_owner',
        as: 'Pet',
      });
      this.hasMany(models.Adopter, {
        foreignKey: 'id_adopter',
        as: 'Adopter',
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        defaultValue: sequelize.literal('UUID_TO_BIN(UUID(), 1)'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      phoneNumber: {
        allowNull: false,
        field: 'phone_number',
        type: DataTypes.STRING(16),
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.CHAR(72),
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
    }
  );
  return User;
};
