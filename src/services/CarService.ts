import { IVehicleZodSchema } from '../interfaces/IVehicle';
import { ICarZodSchema, ICar } from '../interfaces/ICar';
import CarModel from '../models/CarModel';

export default class CarService {
  constructor(private _model: CarModel = new CarModel()) {
    this.create = this.create.bind(this);
  }

  public async create(body: ICar): Promise<ICar> {
    const validVehicle = IVehicleZodSchema.safeParse(body);
    if (!validVehicle.success) throw validVehicle.error;

    const validICart = ICarZodSchema.safeParse(body);
    if (!validICart.success) throw validICart.error;

    const result = await this._model.create(body);
    return result;
  }
}
