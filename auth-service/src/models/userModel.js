const createDatabaseConnection = require('../shared/utils/db');
const { DataTypes } = require('sequelize');

const sequelize = createDatabaseConnection('auth_service');

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone:{ type: DataTypes.STRING, allowNull: true},
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false},
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    isBlocked: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false,defaultValue:false },
    verificationToken: { type: DataTypes.STRING, allowNull: true },
    verificationCode: { type: DataTypes.STRING, allowNull: true },
});

sequelize.sync();


module.exports = User;