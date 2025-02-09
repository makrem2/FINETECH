const createDatabaseConnection = require('../shared/utils/db');
const { DataTypes } = require('sequelize');

const sequelize = createDatabaseConnection('auth_service');

const TokenBlackList = sequelize.define('TokenBlackList', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});
sequelize.sync();

module.exports = TokenBlackList;
