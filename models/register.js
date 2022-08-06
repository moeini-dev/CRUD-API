const sequelize = require('./index'); /////////////

module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define('register', {
        firstName: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING
        },

        gender: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING,
            unique: true
        },

        password: {
            type: DataTypes.STRING
        },

        number: {
            type: DataTypes.INTEGER,
            unique: true
        }
    });
    return Register;
};