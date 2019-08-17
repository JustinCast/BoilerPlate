import { Router, Request, Response } from 'express';
const { config } = require("dotenv");  
import { c } from "../../config/config";
const { ConnectionPool } = require("mssql");  
const { Client } = require('pg')



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

  async getVehicle(req: Request, res: Response){
    try {
      const pool = await new ConnectionPool(c).connect();
      const result = await pool.request()
        .query('SELECT * FROM vehicle WHERE id = '+req.params.id);
      pool.close();
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
    }

  }
  
 /*async getVehiclesPG(req : Request, res: Response){
    try {
      let client = new Client({
        host:'172.24.4.41',
        user:'cm_learning',
        password:'A6Pw6qJkVfRqq5uV',
        database:'OctoBird',
        port:5432
      });
      client.connect(err => {
        if(err){
          res.json(err)
        }
        else {
          let query = {
            text: "SELECT * FROM vehicle",
            values:[]
          };
          client.query(query.text)
        }
      })
      
      const res = await client.query('select * from vehicle')
    } catch (error) {
      console.error(error);
    }
  }*/

  routes() {
    this.router.get('/getVehicles', this.getVehicles);
    this.router.get('/getVehicle/:id', this.getVehicle);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();


export default vehicleRoutes.router;