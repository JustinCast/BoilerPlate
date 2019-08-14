import express = require("express");
import bodyParser = require("body-parser");
//import { path } from "path";
//import { app } from "";

class Server {
  // creación de la instancia del middleware de express
  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  /**
   * Metodo de configuración y cors
   * CORS : Cross Origin Resource Sharing
   */
  config(): void {
    // body-parser parsea el contenido proveniente en la solicitud
    // para permitir una interface de tratamiento de datos más fácil
    this.app.use(bodyParser.urlencoded({extended: true}));
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
    //this.app.use(express.static(__dirname + "/dist/verduleriavirtualweb"));

    // seteo de nuestro manejador
    this.app.use('/api', (req, res) => res.send('Hello world'));

    //Set Port
    this.app.listen(process.env.PORT || 5000);
  }
}

// exportación de nuestro middleware
export default new Server().app;