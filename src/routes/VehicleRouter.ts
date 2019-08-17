import { Router, Request, Response } from 'express';
const { config } = require("dotenv");
import { c } from "../../config/config";
const { ConnectionPool } = require("mssql");

import pg from "pg";

const cP = {
  user: 'cm_learning',
  password: 'A6Pw6qJkVfRqq5uV',
  host: '172.24.4.40',
  database: 'OctoBird'
};

class VehicleRouter {
  router: Router;

  constructor() {
    this.router = Router();
    config();
  }

  async getVehicles(req: Request, res: Response) {
    try {
      const pool = await new ConnectionPool(c).connect();
      const result = await pool.request()
        .query("SELECT * FROM vehicle");

      pool.close();
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
    }
  }

  getVehiclesPostgres(req: Request, res: Response): void {
    try {
      let client = new pg.Client(cP);
      client.connect(err => {
        if (err) {
          res.json(err);
          console.log(`Ha ocurrido un error en el método getVehiclePostgress: ${JSON.stringify(err)}`);
        }

        else {
          let query = "SELECT * FROM vehicle";
          client.query(query)
            .then(data => res.json(data.rows))
            .catch((err) => console.log(`Ha ocurrido un error en el método getVehiclePostgress: ${JSON.stringify(err)}`))
        }
      })
    } catch (error) {
      console.log(`Ha ocurrido un error en el método getVehiclePostgress: ${JSON.stringify(error)}`);
    }
  }

  getVehicle(req: Request, res: Response) {
    try {
      let client = new pg.Client(cP);
      client.connect(err => {
        if (err) {
          res.json(err);
          console.log(`Ha ocurrido un error en el método getVehicle: ${JSON.stringify(err)}`);
        }

        else {
          let query = {
            text: "SELECT * FROM vehicle WHERE id = $1",
            values: [req.params.id]
          };
          client.query(query)
            .then(data => {
              res.json(data.rows);
              client.end();
            })
            .catch((err) => console.log(`Ha ocurrido un error en el método getVehicle: ${JSON.stringify(err)}`))
        }
      })
    } catch (error) {
      console.log(`Ha ocurrido un error en el método getVehicle: ${JSON.stringify(error)}`);
    }
  }



  routes() {
    this.router.get('/getVehicles', this.getVehicles);
    this.router.get('/getVehiclesPostgres', this.getVehiclesPostgres);
    this.router.get('/getVehicle', this.getVehicle);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();


export default vehicleRoutes.router;