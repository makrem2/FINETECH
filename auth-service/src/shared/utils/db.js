const { Sequelize } = require('sequelize');

// Define a function to create a Sequelize connection
const createDatabaseConnection = (dbName) => {
    return new Sequelize(dbName, 'root', 'Makrem@50851779', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306, // Default MySQL port
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
};

module.exports = createDatabaseConnection;