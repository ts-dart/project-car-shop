import { IVehicleZodSchema } from '../interfaces/IVehicle';
import { ICarZodSchema } from '../interfaces/ICar';
// import ICarWithTest from '../interfaces/ICarWithTest';
import ICarWithId from '../interfaces/ICarWithId';
import CarModel from '../models/CarModel';

export default class CarService {
  private _minLengthIdMsgErr = 'Id must have 24 hexadecimal characters';
  private _objectNotFoundMsgErr = 'Object not found';

  constructor(private _model: CarModel = new CarModel()) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(body: ICarWithId): Promise<ICarWithId> {
    const validVehicle = await IVehicleZodSchema.safeParse(body);
    if (!validVehicle.success) throw validVehicle.error;
    
    const validICart = await ICarZodSchema.safeParse(body);
    if (!validICart.success) throw validICart.error;

    const result = await this._model.create(body);
    return result;
  }

  public async read(): Promise<ICarWithId[]> {
    const result = await this._model.read();
    return result;
  }

  public async readOne(id: string): Promise<ICarWithId> {
    if (id.length < 24) throw new Error(this._minLengthIdMsgErr);

    const result = await this._model.readOne(id);
    if (!result) throw new Error(this._objectNotFoundMsgErr);

    return result;
  }

  public async update(id: string, body: ICarWithId): Promise<unknown> {
    if (Object.keys(body).length === 0) throw new Error('Body is required');
    if (id.length < 24) throw new Error(this._minLengthIdMsgErr);

    const result = await this._model.update(id, body);
    if (!result.modifiedCount) throw new Error(this._objectNotFoundMsgErr);
    
    return body;
  }

  public async delete(id: string): Promise<unknown> {
    if (id.length < 24) throw new Error(this._minLengthIdMsgErr);

    const result = await this._model.delete(id);
    if (!result.deletedCount) throw new Error(this._objectNotFoundMsgErr);

    return {};
  }
}
