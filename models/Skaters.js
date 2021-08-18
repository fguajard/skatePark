const Sequealize = require("sequelize");

const sequalize = require("../database/database");

const Skater = sequalize.define(
  "skaters",
  {
    id: {
      type: Sequealize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequealize.TEXT,
      allowNull: false,
    },
    nombre: {
      type: Sequealize.TEXT,
      allowNull: false,
    },
    password: {
      type: Sequealize.TEXT,
      allowNull: false,
    },
    anos_experiencia: {
      type: Sequealize.INTEGER,
      allowNull: false,
    },
    especialidad: {
      type: Sequealize.TEXT,
      allowNull: false,
    },
    foto: {
      type: Sequealize.TEXT,
      allowNull: false,
    },
    estado: {
      type: Sequealize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Skater;
