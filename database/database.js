const Sequalize = require("sequelize");

const uri = process.env.DATABASE_URI;
const host = process.env.DATABASE_HOST || "localhost";
const database = process.env.DATABASE_NAME || "skatepark";
const puerto = process.env.DATABASE_PUERTO || 5432;
const usuario = process.env.DATABASE_USUARIO || "postgres";
const contraseña = process.env.DATABASE_CONTRASENA || "postgres";

module.exports = new Sequalize(uri, {
  host: host,
  dialect: "postgres",
  port: puerto,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});
