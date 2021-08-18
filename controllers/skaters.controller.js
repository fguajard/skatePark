const Skater = require("../models/Skaters");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const addSkater = async (req, res) => {
  try {
    const newSkater = req.body;
    const { password } = newSkater;
    newSkater.password = await bcrypt.hash(password, 10);
    newSkater.estado = false;
    newSkater.foto = req.avatar;
    const skaterAgregado = await Skater.create(newSkater, {
      fields: Object.keys(newSkater),
    });
    res.status(201).send(skaterAgregado);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getSkaters = async (req, res) => {
  try {
    const skaters = await Skater.findAll();
    res.status(200).send(skaters);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getOneSkater = async (req, res) => {
  try {
    const { id: idSkater } = req.params;
    const skaterEncontrado = await Skater.findByPk(idSkater);
    if (!skaterEncontrado)
      return res.status(404).json({
        message: `El Skater con el id ${idSkater} no existe en la base de datos`,
      });
    res.status(200).send(skaterEncontrado);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteSkater = async (req, res) => {
  try {
    const { id: idSkater } = req.params;
    const skaterInDatabase = await Skater.findByPk(idSkater);
    const skaterEliminado = await Skater.destroy({
      where: {
        id: idSkater,
      },
    });
    const nombreFotoAvatar = skaterInDatabase.foto.split("imagenes/")[1];
    fs.unlinkSync(
      path.join(__dirname, `../public/imagenes/${nombreFotoAvatar}`)
    );
    if (!skaterEliminado)
      return res.status(404).json({
        message: `El Skater con el id ${idSkater} no existe en la base de datos`,
      });
    res.status(200).json({ message: "Skater Eliminado con Exito" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateSkater = async (req, res) => {
  try {
    const { id: idSkater } = req.params;
    const newDataSkater = req.body;
    if (newDataSkater.password) {
      const { password } = newDataSkater;
      newDataSkater.password = await bcrypt.hash(password, 10);
    }
    const skaterInDatabase = await Skater.findByPk(idSkater);
    if (!skaterInDatabase)
      return res.status(404).json({
        message: `El Skater con el id ${idSkater} no existe en la base de datos`,
      });
    await Skater.update(newDataSkater, {
      where: {
        id: idSkater,
      },
    });
    const skaterUpdated = await Skater.findByPk(idSkater);
    res.status(200).json(skaterUpdated);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkaters,
  addSkater,
  getOneSkater,
  deleteSkater,
  updateSkater,
};
