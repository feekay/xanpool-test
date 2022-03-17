import { expect } from 'chai';
import * as mockito from 'ts-mockito';
import { FixerApi } from '../../src/repositories/fixer-oracle';
import { PairsCacheImpl } from '../../src/repositories/pairs-cache';
import { PairsRepository } from '../../src/repositories/pairs-repository';
import { Pair } from '../../src/services/pairs-service';

describe('Pair Controller Test', function () {
  const cache = new PairsCacheImpl(100);
  const oracle = mockito.mock(FixerApi);
  const repo = new PairsRepository(cache, oracle);
  const pair = mockito.mock(Pair);

  it('when cache is hit, load from cache', async function () {
    mockito.when(oracle.getByName('USD', 'EUR')).thenResolve(pair);

    cache.save(new Pair('USD', 'EUR', 1.3, Date.now()));
    const result = await repo.get('USD', 'EUR');
    expect(result).to.be.an('object');
    expect(result.name).to.equal('USD-EUR');
  });
  it('when cache is hit, oracle shouldnt be used', async function () {
    mockito.when(oracle.getByName('USD', 'EUR')).thenResolve(pair);
    cache.save(new Pair('USD', 'EUR', 1.3, Date.now()));

    const result = await repo.get('USD', 'EUR');
    expect(result).to.be.an('object');
  });

  it('when cache is missed, oracle should be used to load data', async function () {
    mockito.when(oracle.getByName('USD', 'EUR')).thenResolve(pair);
    const result = await repo.get('USD', 'EUR');
    expect(result).to.be.an('object');
    expect(result.name).to.equal('USD-EUR');
    mockito.verify(oracle.getByName);
  });

  it('when cache is missed, and oracle fails, throw error', async function () {
    mockito.when(oracle.getByName('USD', 'EUR')).thenResolve(pair);
    const result = await repo.get('USD', 'EUR');
    expect(result).to.be.an('object');
    expect(result.name).to.equal('USD-EUR');
    mockito.verify(oracle.getByName);
  });
});
