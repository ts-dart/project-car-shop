import * as sinon from 'sinon';
import chai from 'chai';

import { IVehicleZodSchema } from '../../../interfaces/IVehicle';
import { ICarZodSchema, ICar } from '../../../interfaces/ICar';
//import ICarWithTest from '../../../interfaces/ICarWithTest';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';
import { carMock } from '../../Mocks/Mocks';

const { expect } = chai;

describe('carService/create', () => {
  before(async () => {
    sinon.stub(IVehicleZodSchema, 'safeParse').resolves({ success: true });
    sinon.stub(ICarZodSchema, 'safeParse').resolves({ success: true });
  })

  after(async () => {
    sinon.restore();
  })
  it('valida se req esta correta/quando a req esta correta', async () => {
    const fakeCarModel = {
      create() {
        return carMock;
      }
    };

    const service = new CarService(fakeCarModel as any);
    const result = await service.create(carMock); 
    expect(result).to.deep.equals(carMock);
  })
});
