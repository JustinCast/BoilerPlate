"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ConnectionPool = require("mssql").ConnectionPool;
var pg_1 = __importDefault(require("pg"));
var Company_1 = require("../models/Company");
var cP = {
    user: 'cm_learning',
    password: 'A6Pw6qJkVfRqq5uV',
    host: '172.24.4.40',
    database: 'OctoBird'
};
var CompanyRouter = /** @class */ (function () {
    function CompanyRouter() {
        this.router = express_1.Router();
    }
    CompanyRouter.prototype.createCompany = function (req, res) {
        var client = new pg_1.default.Client(cP);
        client.connect(function (err) {
            if (err) {
                res.json(err);
                console.log("Ha ocurrido un error en el m\u00E9todo createCompany: " + JSON.stringify(err));
            }
            else {
                var company = new Company_1.Company(req.body);
                var query = {
                    text: "select add_company_walter($1, $2, $3)",
                    values: [
                        company.name,
                        company.address,
                        company.tel
                    ]
                };
                client.query(query)
                    .then(function (data) { return res.json(data.rows[0]); })
                    .catch(function (err) { return console.log("Ha ocurrido un error en el m\u00E9todo createCompany: " + JSON.stringify(err)); });
            }
        });
    };
    CompanyRouter.prototype.getCompanies = function (req, res) {
        var client = new pg_1.default.Client(cP);
        client.connect(function (err) {
            if (err) {
                res.json(err);
                console.log("Ha ocurrido un error en el m\u00E9todo getCompanies: " + JSON.stringify(err));
            }
            else {
                var query = {
                    text: "select * from get_companies_walter()",
                };
                client.query(query)
                    .then(function (data) {
                    var companies = data.rows;
                    res.status(200).send(companies);
                    console.log(companies);
                })
                    .catch(function (err) { return console.log("Ha ocurrido un error en el m\u00E9todo getCompanies: " + JSON.stringify(err)); });
            }
        });
    };
    CompanyRouter.prototype.configRoutes = function () {
        this.router.post('/addCompany', this.createCompany);
        this.router.get('/getCompanies', this.getCompanies);
    };
    return CompanyRouter;
}());
exports.CompanyRouter = CompanyRouter;
var companyRoutes = new CompanyRouter();
companyRoutes.configRoutes();
exports.default = companyRoutes.router;
