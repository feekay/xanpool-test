import { PairsCache, PairsOracle } from '../repositories/pairs-repository';
import debug from 'debug';
const debugLog: debug.IDebugger = debug('cron:cache-backfill');
export class CacheBackService {
  private cache: PairsCache;
  private oracle: PairsOracle;
  private cachedPairs: string[];

  constructor(cachedPairs: string[], cache: PairsCache, oracle: PairsOracle) {
    this.cache = cache;
    this.oracle = oracle;
    this.cachedPairs = cachedPairs;
  }

  execute = async (): Promise<void> => {
    this.cachedPairs.forEach((pair) => {
      const pairs = pair.split('-');
      this.oracle
        .getByName(pairs[0], pairs[1])
        .then(this.cache.save)
        .catch((e) => {
          debugLog(e);
        });
    });
  };
}
