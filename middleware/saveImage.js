const { v4 } = require("uuid");
const path = require("path");

const addImage = async (req, res, next) => {
  if (!req.files)
    return res.status(400).send({
      message: "La imagen de perfil es obligatoria",
    });
  const { imagen } = req.files;
  const { mimetype } = imagen;
  if (!mimetype.startsWith("image"))
    return res.status(400).send({
      message: "El archivo que intentas subir no es de tipo imagen",
    });
  const nameFoto = `${v4().slice(0, -25)}`;
  await imagen.mv(path.join(__dirname, `../public/imagenes/${nameFoto}.jpg`));
  req.avatar = `/imagenes/${nameFoto}.jpg`;
  next();
};

module.exports = addImage;
