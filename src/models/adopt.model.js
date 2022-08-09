'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Adopt extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id_adopter',
      });
      this.belongsTo(models.Pet, {
        foreignKey: 'id_pet',
      });
    }
  }
  Adopt.init(
    {
      idAdopter: {
        allowNull: false,
        field: 'id_adopter',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      idPet: {
        allowNull: false,
        field: 'id_pet',
        primaryKey: true,
        references: {
          model: 'pet',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      status: {
        allowNull: false,
        defaultValue: 'Pending',
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
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
      modelName: 'Adopt',
      tableName: 'adopt',
    }
  );
  return Adopt;
};
