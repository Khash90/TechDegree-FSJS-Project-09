"use strict";

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'FirstName is required'
                },
                notEmpty: {
                    msg: 'Please provide a FirstName'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'LastName is required'
                },
                notEmpty: {
                    msg: 'Please provide a LastName'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'the Email you entered already exists'
            },
            validate: {
                notNull: {
                    msg: 'An email is required'
                },
                notEmpty: {
                    msg: 'Please provide a valid Email'
                }
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
                len: {
                    args: [6, 20],
                    msg: 'The password should be between 6 and 20 characters in length'
                }
            }
        },
        confirmedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                if (val === this.password) {
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('confirmedPassword', hashedPassword);
                }
            },
            validate: {
                notNull: {
                    msg: 'Both passwords must match'
                }
            }
        }
    }, {
        sequelize,
        modelName: "User"
        
        });

    //Associate hasMany
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };
        
    return User;
}