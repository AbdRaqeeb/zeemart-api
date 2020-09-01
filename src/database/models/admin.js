'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Product }) {
            // define association here
            Admin.hasMany(Product, {
                foreignKey: 'admin_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    };
    Admin.init({
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 200,
                min: 2,
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 200,
                min: 2,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 6
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM({
                values: ['SuperAdmin', 'Admin']
            }),
            defaultValue: 'Admin',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM({
                values: ['active', 'ban', 'suspend']
            }),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Admin',
        tableName: 'Admins'
    });

    return Admin;
};