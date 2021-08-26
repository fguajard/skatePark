const Sequalize = require("sequelize");

const host = process.env.DATABASE_HOST || "localhost";
const database = process.env.DATABASE_NAME || "skatepark";
const puerto = process.env.DATABASE_PUERTO || 5432;
const usuario = process.env.DATABASE_USUARIO || "postgres";
const contraseña = process.env.DATABASE_CONTRASENA || "postgres";

module.exports = new Sequalize(database, usuario, contraseña, {
  host: host,
  dialect: "postgres",
  port: puerto,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});
