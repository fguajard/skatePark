const Sequalize = require("sequelize");

module.exports = new Sequalize("skatepark", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});
