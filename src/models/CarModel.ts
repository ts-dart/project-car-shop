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
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  } 

  public async create(body: ICar): Promise<ICarWithId> {
    const {
      _id: id, model, year, color, buyValue, doorsQty, seatsQty,
    } = await this._model.create(body);
    
    return { _id: id, model, year, color, buyValue, doorsQty, seatsQty };
  }

  public async read(): Promise<Array<ICarWithId>> {
    const result = await this._model.find();
    return result.map(({
      _id: id, model, year, color, buyValue, doorsQty, seatsQty,
    }) => ({ buyValue, color, doorsQty, _id: id, model, seatsQty, year }));
  }

  public async readOne(id: string | null): Promise<ICarWithId | null> {
    const result = await this._model.findOne({ _id: id });
    return !result ? null : {
      buyValue: result.buyValue,
      color: result.color,
      doorsQty: result.doorsQty,
      _id: result._id,
      model: result.model,
      seatsQty: result.seatsQty,
      year: result.year, 
    };
  }

  public async update(id: string | null, body: ICarWithId)/* : Promise<ICarWithId | null> */ {
    const result = await this._model.updateOne({ _id: id }, { 
      buyValue: body.buyValue,
      color: body.color,
      doorsQty: body.doorsQty,
      _id: body._id,
      model: body.model,
      seatsQty: body.seatsQty,
      year: body.year,
    });

    return result;
  }

  public async delete(id: string | null)/* : Promise<ICarWithId | null> */ {
    const result = await this._model.deleteOne({ _id: id });
    return result;
  }
}
