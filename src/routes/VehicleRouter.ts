import { Router, Request, Response } from "express";
const { config } = require("dotenv");
import { c } from "../../config/config";
const { ConnectionPool } = require("mssql");
import { Client } from "pg";

class VehicleRouter {
  router: Router;

  constructor() {
    this.router = Router();
    config();
  }

  async getVehicles(req: Request, res: Response) {
    try {
      const pool = await new ConnectionPool(c).connect();
      const result = await pool.request().query("SELECT * FROM vehicle");

      pool.close();
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
    }
  }

  getVehiclesPostgres(req: Request, res: Response) {
    try {
      let client = new Client();
      client.connect(err => {
        if (err) res.json(err);
        else {
          let query = {
            text: "SELECT * FROM vehicle WHERE name = $1",
            values: [req.params.name]
          };
          client
            .query(query.text)
            .then(data => {
              res.json(data.rows);
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

  getVehicle(req: Request, res: Response): void {
    let id = req.params.id;
    let query = `SELECT * FROM vehicle WHERE id = ${id} `;
  }

  routes() {
    this.router.get("/getVehicles", this.getVehicles);
    this.router.get("/getVehiclesPostgres", this.getVehiclesPostgres);
    this.router.get("/getVehicle/:id", this.getVehicle);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();

export default vehicleRoutes.router;
