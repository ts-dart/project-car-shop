import { Router } from 'express';

import CarController from '../controllers/CarController';

const route = Router();

const controller: CarController = new CarController();

route.post('/', controller.create);

export default route;
