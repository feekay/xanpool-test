import { Pair } from '../services/pairs-service';
import { PairsCache } from './pairs-repository';

export class PairsCacheImpl implements PairsCache {
  private cache: Map<string, Pair> = new Map();
  private ttl: number;

  constructor(ttl: number) {
    this.ttl = ttl;
  }

  save = (pair: Pair): void => {
    this.cache.set(pair.name, pair);
  };
  get = (base: string, other: string): Pair | undefined => {
    const key = base + '-' + other;
    const cached = this.cache.get(key);
    if (cached != null) {
      if (Date.now() - cached.time > this.ttl) {
        this.cache.delete(key);
        return undefined;
      }
    }
    return cached;
  };
}
