const express = require("express");
const router = express.Router();

const { verifyTokenQuery } = require("../middleware/verifyToken");

const loginValidation = require("../middleware/loginValidation");

router.get("/", (req, res) => {
  res.render("Inicio");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

router.get("/registro", (req, res) => {
  res.render("Registro");
});

router.get("/admin", (req, res) => {
  res.render("Admin");
});

router.get("/datos", verifyTokenQuery, (req, res) => {
  res.render("Datos", { datosUser: req.decoded.skaterExist });
});

router.post("/login", loginValidation);

module.exports = router;
