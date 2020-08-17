'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Order }) {
      // define association here
      Product.belongsTo(Category, {
        foreignKey: 'category_id'
      });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        max: 100
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isNumeric: true
      }
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    discount: {
      type: DataTypes.SMALLINT,
      allowNull: true,
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
    modelName: 'Product',
    tableName: 'Product'
  });
  return Product;
};