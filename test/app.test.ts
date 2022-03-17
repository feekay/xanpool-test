import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app';

describe('get latest rates', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });

  it('test get to latest/pairs', async function () {
    this.timeout(0);
    const res = await request.get('/latest?pair=USD-EUR').send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
  });
});
