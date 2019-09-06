import{ Router, Request, Response } from "express";
const { config } = require("dotenv");
import { postgressConfig } from "../../config/config";
import { Client } from "pg";
import { Company } from "../models/Company";

class CompanyRouter {
    router: Router;

    constructor(){
        this.router = Router();

    }

    createCompany(req: Request, res: Response){
        let client = new Client(postgressConfig);

        //connection
        client.connect(err => {
            if (err) res.json(err);
            else{
                let company: Company = new Company(req.body);
                let query = {
                    text: "SELECT * FROM add_company_steve($1,$2,$3)",
                    values: [
                        company.name,
                        company.address,
                        company.tel
                    ]
                };
                client.query(query)
                .then(() => res.status(201).send({mensaje: "Todo salió bien"}))
                .catch((err) => console.log("error"));
            }
        })
    }

    getCompanies(req: Request, res: Response){
        let client = new Client(postgressConfig);

        //connection
        client.connect(err => {
            if (err) res.json(err);
            else{
                let query = "SELECT * FROM get_companies_steve()";

                client.query(query)
                //.then(() => res.status(201).send({mensaje: "Todo salió bien"}))
                .then(data => {
                    let companies : Array<Company> = data.rows;
                    res.status(200).send(companies);
                })
                .catch(err => console.error(`Ha ocurrido un error: ${JSON.stringify(err)}`));
            }
        })
    }
    routes(){
        this.router.post("/addCompany", this.createCompany);
        this.router.get("/getCompanies", this.getCompanies);
    }
}

const companyRoutes = new CompanyRouter();
companyRoutes.routes();

export default companyRoutes.router;
