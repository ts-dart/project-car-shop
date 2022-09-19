import * as sinon from 'sinon';
import chai from 'chai';

import { Request, Response } from 'express';

import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import ICarWithId from '../../../interfaces/ICarWithId';
import { carMock } from '../../Mocks/Mocks';

const { expect } = chai;

describe('carController/create', () => {
  const res: any = {};
  before(async () => {
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
 });

  after(()=>{
   sinon.restore();
  })

  it('envia a req para o service e responde o usuario', async () => {
    const fakeCarService = {
      create() {
        return carMock;
      }
    }

    const controller = new CarController(fakeCarService as any);
    await controller.create({} as Request, res as Response);
    expect(res.status.getCall(0).args[0]).to.equal(201);
    expect(res.send.getCall(0).args[0]).to.deep.equals(carMock);
  });
});
