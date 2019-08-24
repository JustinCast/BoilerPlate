import { Router, Request, Response } from "express";
const { config } = require("dotenv");
import { postgresConfig } from "../../config/config";
import { Client } from "pg";
import Company from "../models/companies";

class CompanyRouter {
  router: Router;

  constructor() {
    this.router = Router();
    config();
  }

  routes() {
    this.router.post('/addCompany', this.addCompanyPostgres);
    this.router.get('/getCompanies', this.getCompanyPostgres);
  }


  addCompanyPostgres(req: Request, res: Response) {
    try {
      let client = new Client(postgresConfig);
      client.connect(err => {
        if(err) {
            res.json(err);
        }else {
          let company = new Company(req.body)
          let query = {
            text: "SELECT * FROM AddCompanyRebeca($1, $2, $3)",
            values: [company.name, company.address, company.telephone]
          };
          client
            .query(query)
            .then(data => {
              res.json(data);
              client.end();
            })
            .catch(err =>
              console.error(
                `Ha ocurrido un error al consultar en addCompanyPostgres ${JSON.stringify(
                  err
                )}`
              )
            );
        }
      });
    } catch (error) {
      console.log(
        `Ha ocurrido un error en el metodo addCompanyPostgres ${JSON.stringify(
          error
        )}`
      );
    }
  }


  getCompanyPostgres(req: Request, res: Response) {
    try {
      let client = new Client(postgresConfig);
      client.connect(err => {
        if (err) {
          res.json(err);
        } else {
          let query = {
            text: "SELECT getCompaniesRebeca()"
          };
          client
            .query(query.text)
            .then(data => {
              res.json(data);
              client.end();
            })
            .catch(err =>
              console.error(
                `Ha ocurrido un error al consultar en getVehiclePostgres ${JSON.stringify(
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

}

const companyRoutes = new CompanyRouter();
companyRoutes.routes();

export default companyRoutes.router;