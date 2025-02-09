const { Sequelize } = require("sequelize");

const createDatabaseConnection = (dbName) => {
  return new Sequelize(dbName, "root", "Makrem@50851779", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
};

module.exports = createDatabaseConnection;
