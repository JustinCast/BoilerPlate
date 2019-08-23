import { Router, Request, Response } from 'express';
const { config } = require("dotenv");  
import { c } from "../../config/config";
const { ConnectionPool } = require("mssql");  
import { Client }  from "pg";

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

  async getVehiclesPostgress(req: Request, res: Response){
    try{
      let client = new Client({
        host: "172.24.4.40",
        user: "cm_learning",
        password: "A6Pw6qJkVfRqq5uV",
        database: "OctoBird"
      });
      client.connect(err => {
        if(err)
          res.json(err);
        else{
          let query = "SELECT * FROM vehicle";
          client.query(query)
          .then(data => res.json(data.rows))
          .catch(err => console.error(`Ha ocurriddo un error al consultar en getVehicles ${JSON.stringify(err)}`));
        }        
      });
    } catch(error){
      console.log(`Ha ocurrido un error en el metodo getVehiclesPostgress ${JSON.stringify(error)}`);
      
    }
  }

  async getVehicle(req: Request, res: Response)  {
    
  }

  routes() {
    this.router.get('/getVehicles', this.getVehicles);
    this.router.get('/getVehiclesPostgress', this.getVehiclesPostgress);
    this.router.get('/getVehicle/:id', this.getVehicle);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();


export default vehicleRoutes.router;