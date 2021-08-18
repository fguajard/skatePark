const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const verifyTokenHeader = (req, res, next) => {
  const token = req.header("token");
  if (!token)
    return res.status(403).send({
      error: "403 Forbidden ",
      message: "No existe token en la consulta",
    });

  try {
    jwt.verify(token, secretKey);
    next();
  } catch ({ message }) {
    res.status(403).send({ error: "403 Forbidden ", message });
  }
};

const verifyTokenQuery = (req, res, next) => {
  const { token } = req.query;
  if (!token)
    return res.status(403).send({
      error: "403 Forbidden ",
      message: "No existe token en la consulta",
    });

  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err)
        return res.status(401).send({
          error: "401 Unauthorized",
          message: err.message,
        });
      else {
        req.decoded = decoded;
        next();
      }
    });
  } catch ({ message }) {
    res.status(403).send({ error: "403 Forbidden ", message });
  }
};

module.exports = { verifyTokenHeader, verifyTokenQuery };
