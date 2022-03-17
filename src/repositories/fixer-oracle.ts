import axios from 'axios';
import debug from 'debug';
import { env } from 'process';
import { Pair } from '../services/pairs-service';
import { PairsOracle } from './pairs-repository';
import createHttpError from 'http-errors';

const debugLog: debug.IDebugger = debug('app:fixer-oracle');

class FixerApi implements PairsOracle {
  url = 'http://data.fixer.io/api/latest';
  tokenParam = '?access_key=';
  baseParam = '&base=';
  symbols = '&symbols=';

  getByName = async (base: string, symbol: string): Promise<Pair> => {
    try {
      const uri =
        this.url +
        this.tokenParam +
        this.getToken() +
        this.baseParam +
        base +
        this.symbols +
        symbol;
      const response = await axios.get(uri);
      const data = response.data as unknown as ServiceResponse;
      if (data.success) {
        debugLog(`Loaded from oracle ${base}-${symbol} at ${data.timestamp}`);
        return new Pair(
          base,
          symbol,
          data.rates.get(symbol) as number,
          data.timestamp
        );
      }
      debugLog(`Api failed on oracle for ${base}-${symbol}`);
      throw createHttpError(
        500,
        `Couldn't load data: ${response.data.error.type}`
      );
    } catch (e: any) {
      debugLog(`Api failed on oracle for ${base}-${symbol}: error:: ${e}`);
      throw createHttpError(500, e.message || '');
    }
  };

  private getToken() {
    return env.ACCESS_TOKEN;
  }
}

interface ServiceResponse {
  rates: Map<string, number>;
  base: string;
  success: boolean;
  timestamp: number;
}

export { FixerApi };
