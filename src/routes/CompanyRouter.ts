import { Router, Request, Response } from "express";
import { postgresql } from "../../config/config";
import { Client } from "pg";
import { Company } from "../models/company";
import { json } from "body-parser";

class CompanyRouter {
    router:Router;
    constructor() {
        this.router = Router();
    }

    createCompany(req: Request, res: Response){
        let client =  new Client(postgresql);

        //connection
        client.connect(err =>{
            if (err) {
                res.json(err);
            } else {
                let company:Company = new Company(req.body.name, req.body.addres, req.body.tel);
                let query = {
                    text: "SELECT * FROM insert_company_jorge($1, $2, $3);",
                    values:[
                        company.name,
                        company.tel,
                        company.address
                    ]
                }

                client.query(query).then(()=>res.status(201).send({mensaje:"Todo Salió Bien"}))
                .catch(err=>console.log(`Ha ocurrido un error al insertar la compañia: ${JSON.stringify(err)}`))
            }
        });
    }

    getCompany(req: Request, res: Response){
        let client =  new Client(postgresql);

        //connection
        client.connect(err =>{
            if (err) {
                res.json(err);
            } else {
                let query = "SELECT * FROM get_companies_justin();"
                client.query(query).then(data=>{
                    let companies = data.rows;
                    res.status(200).send(companies);
                })
                .catch(err=>console.log(`Ha ocurrido un error al insertar la compañia: ${JSON.stringify(err)}`))
            }
        });
    }
    routes(){
        this.router.get('/getCompanies',this.getCompany)
    }
}
const companyRouter = new CompanyRouter();
companyRouter.routes()
export default companyRouter.router;