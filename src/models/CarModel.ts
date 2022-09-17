import {
  model as mongooseCreateModel,
  Schema,
  Model,
} from 'mongoose';

import { ICar } from '../interfaces/ICar';
import ICarWithId from '../interfaces/ICarWithId';
// import ICarWithTest from '../interfaces/ICarWithTest';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel {
  constructor(
    private _model: Model<ICar> = mongooseCreateModel(
      'cars',
      carMongooseSchema,
    ),
  ) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
  } 

  public async create(body: ICar): Promise<ICarWithId> {
    const {
      _id: id, model, year, color, buyValue, doorsQty, seatsQty,
    } = await this._model.create(body);
    
    return { id, model, year, color, buyValue, doorsQty, seatsQty };
  }

  public async read()/* : Promise<ICarWithId> */ {
    const result = await this._model.find();
    return result.map(({
      _id: id, model, year, color, buyValue, doorsQty, seatsQty,
    }) => ({ buyValue, color, doorsQty, id, model, seatsQty, year }));
  }
}
