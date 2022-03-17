import { Pair } from '../services/pairs-service';
import { PairsOracle } from './pairs-repository';

class FakeApi implements PairsOracle {
  getByName = async (base: string, symbol: string): Promise<Pair> => {
    return new Pair(base, symbol, 1.0, Date.now());
  };
}

export { FakeApi };
