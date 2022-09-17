import { Router } from 'express';

import CarController from '../controllers/CarController';

const route = Router();

const controller: CarController = new CarController();

route.post('/', controller.create);
route.get('/', controller.read);

export default route;
