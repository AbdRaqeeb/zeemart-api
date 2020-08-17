'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Type, Product }) {
      // define association here
      Category.hasMany(Product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'category_id'
      });
      Category.belongsTo(Type, {
        foreignKey: 'type_id'
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        max: 50
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category'
  });
  return Category;
};