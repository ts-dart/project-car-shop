import { Request, Response } from 'express';
import CarService from '../services/CarService';

export default class CarController {
  constructor(private _service: CarService = new CarService()) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response):Promise<Response> {
    const result = await this._service.create(req.body);
    return res.status(201).send(result);
  }

  public async read(req: Request, res: Response):Promise<Response> {
    const result = await this._service.read();
    return res.status(200).send(result);
  }

  public async readOne(req: Request, res: Response):Promise<Response> {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).send(result);
  }

  public async update(req: Request, res: Response):Promise<Response> {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).send(result);
  }

  public async delete(req: Request, res: Response):Promise<Response> {
    const result = await this._service.delete(req.params.id);
    return res.status(204).send(result);
  }
}
