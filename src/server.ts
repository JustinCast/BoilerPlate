import express = require("express");
import bodyParser = require("body-parser");


//import { path } from "path";
//import { app } from "";
import VehicleRouter from './routes/VehicleRouter';
import CompanyRouter from './routes/CompanyRouter';
import { Router, Request, Response, NextFunction } from "express";

class Server {
  // creación de la instancia del middleware de express
  app: express.Application;

  // my on middlewares
  private middlewares = {

    isLoggedIn : function (req: Request, res: Response, next: any) {
      console.log(`query: ${req.query.id}`);
      return next();
    }
};

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
    this.app.use((_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader('Content-Type', 'application/json');
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next(); // chain the another middleware in pipeline
    });
  }

  /**
   * Configuración de entrada al enturador
   */
  routerConfig(): void {
    //this.app.use(express.static(__dirname + "/dist/verduleriavirtualweb"));

    // seteo de nuestro manejador
    this.app.use('/vehicles', VehicleRouter);
    this.app.use('/companies', CompanyRouter);
    this.app.get('/test', this.middlewares.isLoggedIn, (req: Request, res: Response) => {
      console.log("inside test route config");
      console.log(req.headers);
      res.send({message: 'ok'})
    });

    //Set Port
    this.app.listen(process.env.PORT || 5000);
  }
}

// exportación de nuestro middleware
export default new Server().app;