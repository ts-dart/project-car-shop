import * as sinon from 'sinon';
import chai from 'chai';

import { IVehicleZodSchema } from '../../../interfaces/IVehicle';
import { ICarZodSchema, ICar } from '../../../interfaces/ICar';
import ICarWithTest from '../../../interfaces/ICarWithTest';
import CarService from '../../../services/CarService';

import ICarWithId from '../../../interfaces/ICarWithId';
import CarModel from '../../../models/CarModel';

const model = new CarModel();

const service = new CarService();

const { expect } = chai;

describe('carService/create', () => {
  before(async () => {
    sinon.stub(IVehicleZodSchema, 'safeParse').resolves({ success: true });
    sinon.stub(ICarZodSchema, 'safeParse').resolves({ success: true });
    sinon.stub(model, 'create').resolves({ id: 'id' } as ICarWithId);
  })

  after(async () => {
    sinon.restore();
  })
  it('valida se req esta correta/quando a req esta correta', async () => {
    const result = await service.create({} as ICarWithTest); 

    expect(result).to.have.property('id').equal('id');
  })
});
