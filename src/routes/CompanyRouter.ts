import { Router, Request, Response } from "express";
const { config } = require("dotenv");
import { Client } from "pg";
import Company from "../models/company";
import { postgresConfig } from "../../config/config";


class CompanyRouter {
    router: Router;

    constructor() {
        this.router = Router();
        config();
    }

    insertCompany(req: Request, res: Response) {
        try {
            let client = new Client(postgresConfig);
            client.connect(err => {
                if (err) res.json(err);
                else {
                    let company: Company = new Company(
                        req.body
                    );
                    let query = {
                        text: "SELECT * FROM insert_company_danny($1, $2, $3);",
                        values: [company.name, company.address, company.tel]
                    };
                    client.query(query)
                        .then(data => {
                            console.log(data)
                            res.json(data);
                            client.end();
                        })
                        .catch(err =>
                            console.error(
                                `Ha ocurrido un error al consultar en insertCompany ${JSON.stringify(
                                    err
                                )}`
                            )
                        );
                }
            });
        } catch (error) {
            console.log(
                `Ha ocurrido un error en el metodo getVehiclePostgres ${JSON.stringify(
                    error
                )}`
            );
        }
    }

    routes() {
        this.router.post("/insertCompany", this.insertCompany);
    }
}

const companyRoutes = new CompanyRouter();
companyRoutes.routes();

export default companyRoutes.router;
