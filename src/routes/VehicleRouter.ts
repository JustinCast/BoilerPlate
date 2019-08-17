import { Router, Request, Response } from 'express';
const { config } = require("dotenv");  
import { c } from "../../config/config";
const { ConnectionPool } = require("mssql");  

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

  getVehicleById(): void {

  }



  routes() {
    this.router.get('/getVehicles', this.getVehicles);
    this.router.get('/getVehicle/:id', this.getVehicleById);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();


export default vehicleRoutes.router;