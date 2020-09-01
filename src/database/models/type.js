'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      Type.hasMany(Category, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: 'type_id'
      })
    }
  };
  Type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'Type'
  });
  return Type;
};