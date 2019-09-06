"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("../../config/config");
var pg_1 = require("pg");
var company_1 = require("../models/company");
var CompanyRouter = /** @class */ (function () {
    function CompanyRouter() {
        this.router = express_1.Router();
    }
    CompanyRouter.prototype.createCompany = function (req, res) {
        var client = new pg_1.Client(config_1.postgresConfig);
        //conection
        client.connect(function (err) {
            if (err)
                res.json(err);
            else {
                var company = new company_1.Company(req.body);
                var query = {
                    text: "SELECT * FROM agregar_compannia_jefferson($1,$2,$3);",
                    values: [
                        company.name,
                        company.addres,
                        company.telephone
                    ]
                };
                client.query(query)
                    .then(function () { return res.status(201).send({ message: "Todo bien" }); })
                    .catch(function (err) { return console.error("Ha ocurrrido un error en el metodo getVehivlePostgre " + JSON.stringify(err)); });
            }
        });
    };
    CompanyRouter.prototype.getCompanies = function (req, res) {
        var client = new pg_1.Client(config_1.postgresConfig);
        //conection
        client.connect(function (err) {
            if (err)
                res.json(err);
            else {
                var company = new company_1.Company(req.body);
                var query = {
                    text: "SELECT * FROM get_companies_justin($1,$2);",
                    values: [
                        req.query.id,
                        req.query.tel
                    ]
                };
                client.query(query)
                    .then(function (data) {
                    var companies = data.rows;
                    ;
                    res.status(200).send(companies);
                });
            }
        });
    };
    CompanyRouter.prototype.routes = function () {
        this.router.post('/createCompany', this.createCompany);
        this.router.get('/getCompanies', this.getCompanies);
    };
    return CompanyRouter;
}());
var companyRoutes = new CompanyRouter();
companyRoutes.routes();
exports.default = companyRoutes.router;
