import { CACHED_PAIRS, CACHE_TTL, NODE_ENV } from './config';
import { FakeApi } from './repositories/fake-api';
import { FixerApi } from './repositories/fixer-oracle';
import { PairsCacheImpl } from './repositories/pairs-cache';
import { PairsRepository } from './repositories/pairs-repository';
import { CacheBackService } from './services/cache-backfill-service';
import { PairsService } from './services/pairs-service';

// TODO: Implement DI to replace these
const cache = new PairsCacheImpl(CACHE_TTL);
const oracle = NODE_ENV == 'test' ? new FakeApi() : new FixerApi();
const pairsRepository = new PairsRepository(cache, oracle);
const pairService = new PairsService(pairsRepository);
const cacheFillService = new CacheBackService(
  CACHED_PAIRS.split(','),
  cache,
  oracle
);

export { pairService, cacheFillService };
