const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Skater = require("../models/Skaters");
const secretKey = process.env.SECRET_KEY;

const loginValidation = async (req, res) => {
  const { email, password } = req.body;
  const skaterExist = await Skater.findOne({
    where: { email },
  });
  if (skaterExist) {
    const valid = await bcrypt.compare(password, skaterExist.password);
    if (valid) {
      const tiempoExpiracionToken = Math.floor(Date.now() / 1000) + 120;
      const token = jwt.sign(
        { exp: tiempoExpiracionToken, skaterExist },
        secretKey
      );
      res.status(200).json({ token });
    } else
      res.status(401).send({
        error: "401 Unauthorized",
        message: "User credentials does not match",
      });
  } else {
    res.status(404).send({
      error: "404 Not Found",
      message: "User credentials does not match",
    });
  }
};

module.exports = loginValidation;
