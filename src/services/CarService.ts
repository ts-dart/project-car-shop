import { IVehicleZodSchema } from '../interfaces/IVehicle';
import { ICarZodSchema, ICar } from '../interfaces/ICar';
// import ICarWithTest from '../interfaces/ICarWithTest';
import CarModel from '../models/CarModel';

export default class CarService {
  constructor(private _model: CarModel = new CarModel()) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
  }

  public async create(body: ICar): Promise<ICar> {
    const validVehicle = await IVehicleZodSchema.safeParse(body);
    if (!validVehicle.success) throw validVehicle.error;
    
    const validICart = await ICarZodSchema.safeParse(body);
    if (!validICart.success) throw validICart.error;

    const result = await this._model.create(body);
    return result;
  }

  public async read()/* : Promise<unknown> */ {
    const result = await this._model.read();
    return result;
  }
}
