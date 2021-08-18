const express = require("express");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.skatersPath = "/api/v1/skaters";

    this.middlewares();
    this.handlebars();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static(path.join(__dirname + "/public/")));
  }

  routes() {
    this.app.use(this.skatersPath, require("./routes/skaters"));
    this.app.use("/", require("./routes/public"));
  }

  handlebars() {
    this.app.set("view engine", ".hbs");
    this.app.engine(
      ".hbs",
      exphbs({
        layoutsDir: __dirname + "/views/layouts/",
        partialsDir: __dirname + "/views/components/",
        extname: ".hbs",
      })
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server up in port ", this.port);
    });
  }
}

module.exports = Server;
