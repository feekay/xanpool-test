import { expect } from 'chai';
import { PairsRepository } from '../../src/repositories/pairs-repository';
import { Pair, PairsService } from '../../src/services/pairs-service';
import * as mockito from 'ts-mockito';

describe('Pair Service Test', function () {
  const repo = mockito.mock(PairsRepository);
  const pairService = new PairsService(repo);
  const pair = mockito.mock(Pair);
  it('on getPair return data from repository', async function () {
    mockito.when(repo.get('USD', 'EUR')).thenResolve(pair);
    const result = await pairService.getPair('USD', 'EUR');
    expect(result).to.be.an('object');
  });
});
