import * as sinon from 'sinon';
import chai from 'chai';

import { IVehicleZodSchema } from '../../../interfaces/IVehicle';
import { ICarZodSchema, ICar } from '../../../interfaces/ICar';
//import ICarWithTest from '../../../interfaces/ICarWithTest';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';

import { 
  carMock,
  responseUpdateOneMock,
  responseDeleteOneMock,
} from '../../Mocks/Mocks';

const { expect } = chai;

describe('carService/create', () => {
  before(async () => {
    sinon.stub(IVehicleZodSchema, 'safeParse').resolves({ success: true });
    sinon.stub(ICarZodSchema, 'safeParse').resolves({ success: true });
  })

  after(async () => {
    sinon.restore();
  })
  it('valida se req esta correta e envia a req para o model', async () => {
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

describe('carService/read', () => {
  it('envia os dados da req para o model', async () => {
    const fakeCarModel = {
      read() {
        return [carMock];
      }
    };

    const service = new CarService(fakeCarModel as any);
    const [result] = await service.read(); 
    expect(result).to.deep.equals(carMock); 
  });  
});

describe('carService/readOne', () => {
  describe('quando os dados da requisição estiverem corretos', () => {
    it('valida se req esta correta e envia a req para o model', async () => {
      const id = '4edd40c86762e0fb12000003';
      const fakeCarModel = {
        readOne() {
          return carMock;
        }
      };
  
      const service = new CarService(fakeCarModel as any);
      const result = await service.readOne(id); 
      expect(result).to.deep.equals(carMock); 
    }); 
  }); 

  describe('quando o id informado possui menos de 24 caracteres', () => {
    it('faz a aplicação lançar um erro pois o id informado e invalido', async () => {
      const id = '999';
      const fakeCarModel = {
        readOne() {
          return carMock;
        }
      };
  
      const service = new CarService(fakeCarModel as any);

      try {
        await service.readOne(id); 
      } catch (err: any) {
        expect(err.message).to.be.equal('Id must have 24 hexadecimal characters');
      } 
    });
  });
});

describe('carService/update', () => {
  it('envia os dados da req para o model', async () => {
    const id = '4edd40c86762e0fb12000003';
    const fakeCarModel = {
      update() {
        return responseUpdateOneMock;
      }
    };

    const service = new CarService(fakeCarModel as any);
    const result = await service.update(id, carMock); 
    expect(result).to.deep.equals(carMock); 
  });  
});

describe('carService/delete', () => {
  it('envia os dados da req para o model', async () => {
    const id = '4edd40c86762e0fb12000003';
    const fakeCarModel = {
      delete() {
        return responseDeleteOneMock;
      }
    };

    const service = new CarService(fakeCarModel as any);
    const result = await service.delete(id); 
    expect(typeof result).to.be.equal('object'); 
  });  
});
