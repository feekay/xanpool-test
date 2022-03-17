import * as mockito from 'ts-mockito';
import { PairsController } from '../../src/controllers/pairs-controller';
import { PairsService } from '../../src/services/pairs-service';
import { expect } from 'chai';
import express from 'express';

describe('Pair Controller Test', function () {
  const pairService: PairsService = mockito.mock(PairsService);
  const controller = new PairsController(pairService);
  let req: express.Request;
  let res: express.Response;
  let next: express.NextFunction;

  beforeEach(function () {
    req = mockito.mock<express.Request>();
    res = mockito.mock<express.Response>();
  });

  it('throw 400 when pair is not passed as query param', function (done) {
    const mockReq = mockito.instance(req);
    mockito.when(req.query).thenReturn({});
    controller
      .getPair(mockReq, res, next)
      .catch((e) => {
        expect(e.status).to.equal(400);
        expect(e.message).to.equal('query paramater required');
      })
      .finally(done);
  });

  it('throw 400 when value of pair is not formatted', function (done) {
    const mockReq = mockito.instance(req);
    mockito.when(req.query).thenReturn({ pair: 'USDEUR' });
    controller
      .getPair(mockReq, res, next)
      .catch((e) => {
        expect(e.status).to.equal(400);
        expect(e.message).to.equal('query paramater format incorrect');
      })
      .finally(done);
  });

  it('return 200 when a valid request is made', function (done) {
    mockito.when(req.query).thenReturn({ pair: 'USD-EUR' });
    const mockReq = mockito.instance(req);
    const mockRes = mockito.instance(res);
    controller
      .getPair(mockReq, mockRes, next)
      .then(() => {
        mockito.verify(mockRes.json(mockito.anything())).once;
        mockito.verify(mockRes.status(200)).once;
      })
      .finally(done);
  });
});
