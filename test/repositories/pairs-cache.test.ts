import { expect } from 'chai';
import { PairsCacheImpl } from '../../src/repositories/pairs-cache';
import { Pair } from '../../src/services/pairs-service';
describe('Pair Cache Test', function () {
  const cache = new PairsCacheImpl(10);
  it('when cache is missed, return undefined', function () {
    expect(cache.get('USD', 'EUR')).to.be.undefined;
  });
  it('when cache is hit, return data', function () {
    cache.save(new Pair('USD', 'EUR', 1.0, Date.now()));
    const result = cache.get('USD', 'EUR');
    expect(result).to.be.an('object');
    expect(result?.rate).to.equal(1.0);
    expect(result?.name).to.equal('USD-EUR');
  });

  it('after ttl is reached return undefined', function (done) {
    cache.save(new Pair('USD', 'EUR', 1.0, Date.now()));
    const result = cache.get('USD', 'EUR');
    expect(result).to.be.an('object');

    setTimeout(() => {
      expect(cache.get('USD', 'EUR')).to.be.undefined;
      done();
    }, 1000);
  });
});
