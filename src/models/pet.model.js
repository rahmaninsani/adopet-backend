'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id_owner',
      });

      this.hasMany(models.Adopt, {
        foreignKey: 'id_pet',
        as: 'Adopt',
      });
    }
  }
  Pet.init(
    {
      id: {
        allowNull: false,
        defaultValue: sequelize.literal('UUID_TO_BIN(UUID(), 1)'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      idOwner: {
        allowNull: false,
        field: 'id_owner',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      kind: {
        allowNull: false,
        type: DataTypes.ENUM('Cat', 'Dog'),
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ageUnit: {
        allowNull: false,
        field: 'age_unit',
        type: DataTypes.ENUM('Days', 'Months', 'Years'),
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM('Male', 'Female'),
      },
      featherColor: {
        allowNull: false,
        field: 'feather_color',
        type: DataTypes.ENUM('Black', 'White', 'Orange', 'Gray', 'Brown'),
      },
      weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      weightUnit: {
        allowNull: false,
        field: 'weight_unit',
        type: DataTypes.ENUM('g', 'kg'),
      },
      photo: {
        allowNull: false,
        defaultValue: 'photo.png',
        type: DataTypes.STRING(100),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('Available', 'Adopted'),
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
      modelName: 'Pet',
      tableName: 'pet',
    }
  );
  return Pet;
};
