import { Router, Request, Response } from 'express';
const { ConnectionPool } = require("mssql");

import pg from "pg";
import { Company } from '../models/Company';


const cP = {
    user: 'cm_learning',
    password: 'A6Pw6qJkVfRqq5uV',
    host: '172.24.4.40',
    database: 'OctoBird'
  };


export class CompanyRouter{
    router: Router;

    constructor(){
        this.router = Router();
    }

    createCompany(req: Request, res: Response){

        let client = new pg.Client(cP);
        client.connect(err => {
        if (err) {
          res.json(err);
          console.log(`Ha ocurrido un error en el método createCompany: ${JSON.stringify(err)}`);
        }

        else {
            let company: Company = new Company(req.body);
            let query = {
                text: "select add_company_walter($1, $2, $3)",
                values: [
                    company.name,
                    company.address,
                    company.tel
                ]
            };
          client.query(query)
            .then(data => res.json(data.rows[0]))
            .catch((err) => console.log(`Ha ocurrido un error en el método createCompany: ${JSON.stringify(err)}`))
        }
      })
    }

    getCompanies(req: Request, res: Response){
        let client = new pg.Client(cP);
        client.connect(err => {
        if (err) {
          res.json(err);
          console.log(`Ha ocurrido un error en el método getCompanies: ${JSON.stringify(err)}`);
        }

        else {
            let query = {
                text: "select * from get_companies_walter()",
            };
          client.query(query)
            .then(data  => {
                let companies : Array<Company> = data.rows;
                res.status(200).send(companies);

                console.log(companies);
            })
            .catch((err) => console.log(`Ha ocurrido un error en el método getCompanies: ${JSON.stringify(err)}`))
        }
      })
    }

    configRoutes(){
        this.router.post('/addCompany', this.createCompany);
        this.router.get('/getCompanies', this.getCompanies);
    }
}

const companyRoutes = new CompanyRouter();
companyRoutes.configRoutes();

export default companyRoutes.router;