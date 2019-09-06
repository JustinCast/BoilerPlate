import { Router,  Request, Response} from "express";
import { postgresConfig} from "../../config/config";
import { Client } from "pg";
import { Company } from "../models/company";

class CompanyRouter{
    router: Router;

    constructor(){
        this.router = Router();
    }

    createCompany(req: Request, res: Response){
        let client = new Client(postgresConfig);
        
        //connection
        client.connect(err => {
            if(err) res.json(err);
            else{
                let company: Company = new Company(
                    req.body
                );
                let query = {
                    text: "SELECT * FROM crearCompania($1, $2, $3);",
                    values: [
                        company.name,
                        company.address,
                        company.phone
                    ]
                };
                client.query(query)
                .then(() => res.status(201).send({ mensaje: "Todo bien"}))
                .catch(err => `Ha ocurrido un error en el metodo crearCompania ${JSON.stringify(err)}`)
            }
        });
    }


    getCompanies(req:Request, res:Response){
        let client = new Client(postgresConfig);

        //conection
        client.connect(err => {
            if(err) res.json(err);
            else{
                let company: Company = new Company(
                    req.body
                );
                let query ={
                    text: "SELECT * FROM get_companies_justin($1,$2);",
                    values:[
                        req.query.id,
                        req.query.tel
                    ]
                };
                client.query(query)
                .then(data => {
                    let companies: Array<Company> = data.rows;;
                    res.status(200).send(companies)
                })
            }
        })
    }

    routes(){
        this.router.get('/crearCompania', this.createCompany);
        this.router.get('/getCompanies', this.getCompanies);
    }
}

const companyRouter = new CompanyRouter();
companyRouter.routes();


export default companyRouter.router;