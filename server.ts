import express = require("express");
import bodyParser = require("body-parser");
//import { path } from "path";
//import { app } from "";

class Server {
  app: express.Application = express();

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  /**
   * Metodo de configuración y cors
   */
  config(): void {
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  /**
   * Configuración de entrada al enturador
   */
  routerConfig(): void {
    this.app.use(express.static(__dirname + "/dist/verduleriavirtualweb"));
    this.app.use('/api', (req, res) => res.send('Hello world'));
    /*app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname + "/dist/verduleriavirtualweb/index.html"));
    });*/

    //Set Port
    this.app.listen(process.env.PORT || 5000);
  }
}

export default new Server().app;