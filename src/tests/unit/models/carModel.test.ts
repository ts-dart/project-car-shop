import * as sinon from 'sinon';
import chai from 'chai';

import { Model } from 'mongoose';

// import { ICar } from '../../../interfaces/ICar';

import ICarWithTest from '../../../interfaces/ICarWithTest';

import CarModel from '../../../models/CarModel';

const { expect } = chai;

const model = new CarModel();

describe('carModel/create', () => {
  before(async () => {
    sinon.stub(Model, 'create').resolves({ 
      _id: 'id',
      model: 'model',
      year: 2022,
      color: 'color',
      buyValue: 10000,
      doorsQty: 2,
      seatsQty: 2,
    });
  })

  after(async () => {
    sinon.restore();
  })
  it('cria um novo documento na coleção cars', async () => {
    const result = await model.create({} as ICarWithTest);
    expect(result).to.have.property('id').equal('id');
  })
})
