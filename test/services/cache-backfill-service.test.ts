import { Pair } from '../../src/services/pairs-service';
import * as mockito from 'ts-mockito';
import { CacheBackService } from '../../src/services/cache-backfill-service';
import {
  PairsCache,
  PairsOracle
} from '../../src/repositories/pairs-repository';

describe('Cache Back fill Service Test', function () {
  const mockOracle = mockito.mock<PairsOracle>();
  const mockedCache = mockito.mock<PairsCache>();
  const pair = mockito.mock(Pair);
  const mockedOracle = mockito.instance(mockOracle);
  mockito.when(mockOracle.getByName('USD', 'EUR')).thenResolve(pair);
  mockito.when(mockOracle.getByName('EUR', 'USD')).thenResolve(pair);
  const cachedBackFill = new CacheBackService(
    ['USD-EUR', 'EUR-USD'],
    mockedCache,
    mockedOracle
  );
  it('on cache back fill verify all pairs are fetched', async function () {
    cachedBackFill.execute();
    mockito.verify(mockOracle.getByName('USD', 'EUR'));
    mockito.verify(mockOracle.getByName('EUR', 'USD'));
    mockito.verify(mockedCache.save(pair)).twice;
  });
});
