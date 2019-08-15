import { Router, Request, Response } from 'express';

class VehicleRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  getVehicles(): void {

  }

  getVehicle(): void {

  }



  routes() {
    this.router.get('/getVehicles', this.getVehicles);
    this.router.get('/getVehicle/:id', this.getVehicle);
  }
}

const vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();


export default vehicleRoutes.router;