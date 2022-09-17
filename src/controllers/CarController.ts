import { Request, Response } from 'express';
import CarService from '../services/CarService';

export default class CarController {
  constructor(private _service: CarService = new CarService()) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
  }

  public async create(req: Request, res: Response):Promise<Response> {
    const result = await this._service.create(req.body);
    return res.status(201).send(result);
  }

  public async read(req: Request, res: Response):Promise<Response> {
    const result = await this._service.read();
    return res.status(200).send(result);
  }
}
