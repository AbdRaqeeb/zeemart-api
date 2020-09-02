'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ OrderDetails, User, Payment }) {
            // define association here
            Order.hasMany(OrderDetails, {
                foreignKey: 'order_id'
            });

            Order.belongsTo(User, {
                foreignKey: 'user_id'
            })

            Order.hasMany(Payment, {
                foreignKey: 'order_id'
            })
        }
    }
    Order.init({
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0
        },
        shipped_on: DataTypes.DATE,
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        comments: DataTypes.STRING(200),
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 200
            }
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM({
                values: ['transfer', 'cash on delivery']
            }),
            defaultValue: 'transfer',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM({
                values: ['pending', 'successful', 'processing', 'canceled']
            }),
            defaultValue: 'pending',
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'Orders'
    });
    return Order;
};