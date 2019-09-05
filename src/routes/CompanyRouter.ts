import { Router, Request, Response } from "express";
import { postgresConfig } from "../../config/config";
import { Client } from "pg";
import { Company } from "../models/Company";

class CompanyRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  createCompany(req: Request, res: Response) {
    let client = new Client(postgresConfig);

    // connection
    client.connect(err => {
      if (err) res.json(err);
      else {
        let company: Company = new Company(
          req.body.name,
          req.body.address,
          req.body.tel
        );
        let query = {
          text: "SELECT * FROM insert_company_justin($1, $2, $3);",
          values: [
            company.name,
            company.address,
            company.tel
          ]
        };

        client.query(query)
        .then(() => res.status(201).send({mensaje: "Todo salió bien"}))
        .catch(err =>
          console.error(
            `Ha ocurrido un error al insertar una compañía: ${JSON.stringify(
              err
            )}`
          )
        );
      }
    })
  }

  getCompanies(req: Request, res: Response) {
    let client = new Client(postgresConfig);

    // connection
    client.connect(err => {
      if (err) res.json(err);
      else {
        let query = "SELECT * FROM get_companies_justin();";

        client.query(query)
        .then(data => {
          let companies: Array<Company> = data.rows;
          res.status(200).send(companies);
        })
        .catch(err =>
          console.error(
            `Ha ocurrido al obtener las compañías: ${JSON.stringify(
              err
            )}`
          )
        );
      }
    })
  }

  routes() {
    this.router.get("/getCompanies", this.getCompanies);
  }
}

const companyRoutes = new CompanyRouter();
companyRoutes.routes();

export default companyRoutes.router;
