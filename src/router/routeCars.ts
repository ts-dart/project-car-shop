import { Router } from 'express';
import CarController from '../controllers/CarController';

const route = Router();
const controller: CarController = new CarController();

route.post('/', controller.create);
route.get('/', controller.read);
route.get('/:id', controller.readOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);

export default route;
