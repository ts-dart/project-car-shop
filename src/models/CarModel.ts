import { model as mongooseCreateModel, Schema, Model } from 'mongoose';
import { ICar } from '../interfaces/ICar';

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
  } 

  public async create(body: ICar) {
    const {
      _id: id, model, year, color, buyValue, doorsQty, seatsQty,
    } = await this._model.create(body);
    
    return { id, model, year, color, buyValue, doorsQty, seatsQty };
  }
}
