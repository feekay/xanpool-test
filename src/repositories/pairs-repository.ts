import debug from 'debug';
import { Pair } from '../services/pairs-service';
const debugLog: debug.IDebugger = debug('app:pairs-repository');
class PairsRepository {
  private cache: PairsCache;
  private oracle: PairsOracle;

  constructor(cache: PairsCache, oracle: PairsOracle) {
    this.cache = cache;
    this.oracle = oracle;
  }

  get = async (base: string, other: string): Promise<Pair> => {
    const cached = this.cache.get(base, other);
    if (cached != null) {
      debugLog(`cache hit for: ${base}-${other}`);
      return cached;
    }
    debugLog(`cache miss for: ${base}-${other}`);
    const newValue = await this.oracle.getByName(base, other);
    this.cache.save(newValue);
    return newValue;
  };
}

interface PairsOracle {
  getByName(base: string, symbol: string): Promise<Pair>;
}

interface PairsCache {
  save(pair: Pair): void;
  get(base: string, other: string): Pair | undefined;
}

export { PairsRepository, PairsCache, PairsOracle };
