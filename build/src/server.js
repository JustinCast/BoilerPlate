"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
//import { path } from "path";
//import { app } from "";
var VehicleRouter_1 = __importDefault(require("./routes/VehicleRouter"));
var Server = /** @class */ (function () {
    function Server() {
        // my on middlewares
        this.middlewares = {
            isLoggedIn: function (req, res, next) {
                console.log("query: " + req.query.id);
                return next();
            }
        };
        this.app = express();
        this.config();
        this.routerConfig();
    }
    /**
     * Metodo de configuración y cors
     * CORS : Cross Origin Resource Sharing
     */
    Server.prototype.config = function () {
        // body-parser parsea el contenido proveniente en la solicitud
        // para permitir una interface de tratamiento de datos más fácil
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(function (_req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next(); // chain the another middleware in pipeline
        });
    };
    /**
     * Configuración de entrada al enturador
     */
    Server.prototype.routerConfig = function () {
        //this.app.use(express.static(__dirname + "/dist/verduleriavirtualweb"));
        // seteo de nuestro manejador
        this.app.use('/vehicles', VehicleRouter_1.default);
        this.app.get('/test', this.middlewares.isLoggedIn, function (req, res) {
            console.log("inside test route config");
            console.log(req.headers);
            res.send({ message: 'ok' });
        });
        //Set Port
        this.app.listen(process.env.PORT || 5000);
    };
    return Server;
}());
// exportación de nuestro middleware
exports.default = new Server().app;
