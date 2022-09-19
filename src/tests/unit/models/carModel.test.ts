import * as sinon from 'sinon';
import chai from 'chai';

import { Model } from 'mongoose';
import ICarWithTest from '../../../interfaces/ICarWithTest';
import CarModel from '../../../models/CarModel';

import { 
  carMock,
  responseUpdateOneMock,
  responseDeleteOneMock,
} from '../../Mocks/Mocks';

const { expect } = chai;

const model = new CarModel();

describe('carModel/create', () => {
  before(async () => {
    sinon.stub(Model, 'create').resolves(carMock)
  })

  after(async () => {
    sinon.restore();
  })

  it('cria um novo documento na coleção cars', async () => {
    const result = await model.create({} as ICarWithTest);
    expect(result).to.deep.equals(carMock);
  })
})

describe('carModel/read', () => {
  before(async () => {
    sinon.stub(Model, 'find').resolves([carMock]);
  })

  after(async () => {
    sinon.restore();
  })

  it('busca todos os documentos na coleção cars', async () => {
    const result = await model.read();
    expect(result[0]).to.have.property('_id').equal('4edd40c86762e0fb12000003');
  })
})

describe('carModel/readOne', () => {
  describe('quando a busca encontra um documento com id correspondente', () => {
    before(async () => {
      sinon.stub(Model, 'findOne').resolves(carMock);
    })
  
    after(async () => {
      sinon.restore();
    })
  
    it('busca um documento na coleção cars pelo id', async () => {
      const id = '4edd40c86762e0fb12000003';
      const result = await model.readOne(id);
      expect(result).to.deep.equals(carMock);
    })
  })

  describe('quando a busca não encontra um documento com id correspondente', () =>{
    before(async () => {
      sinon.stub(Model, 'findOne').resolves(null);
    })
  
    after(async () => {
      sinon.restore();
    })
  
    it('busca um documento na coleção cars pelo id', async () => {
      const id = '999999999999999999999999';
      const result = await model.readOne(id);
      expect(result).to.deep.equals(null);
    })
  })
  })
  

describe('carModel/update', () => {
  before(async () => {
    sinon.stub(Model, 'updateOne').resolves(responseUpdateOneMock as any);
  })

  after(async () => {
    sinon.restore();
  })

  it('atualiza um documento na coleção cars pelo de acorodo com o ida', async () => {
    const id = '4edd40c86762e0fb12000003';
    const result = await model.update(id, carMock);
    expect(result).to.deep.equals(responseUpdateOneMock);
  })
})

describe('carModel/delete', () => {
  before(async () => {
    sinon.stub(Model, 'deleteOne').resolves(responseDeleteOneMock);
  })

  after(async () => {
    sinon.restore();
  })

  it('atualiza um documento na coleção cars pelo de acorodo com o ida', async () => {
    const id = '4edd40c86762e0fb12000003';
    const result = await model.delete(id);
    expect(result).to.deep.equals(responseDeleteOneMock);
  })
})
