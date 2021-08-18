const express = require("express");
const expressFileUpload = require("express-fileupload");
const router = express.Router();
const {
  addSkater,
  getSkaters,
  getOneSkater,
  deleteSkater,
  updateSkater,
} = require("../controllers/skaters.controller");

const { verifyTokenHeader } = require("../middleware/verifyToken");

const saveImage = require("../middleware/saveImage");

router.use(
  expressFileUpload({
    limits: { fileSize: 10000000 },
    abortOnLimit: true,
    responseOnLimit:
      "El peso del archivo que intentas subir supera el limite permitido",
  })
);

router.use(express.urlencoded({ extended: false }));

router.get("/", getSkaters);

router.get("/:id", getOneSkater);

router.post("/", saveImage, addSkater);

router.put("/:id", verifyTokenHeader, updateSkater);

router.delete("/:id", verifyTokenHeader, deleteSkater);

module.exports = router;
