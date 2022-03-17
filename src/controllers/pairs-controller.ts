import express from 'express';
import debug from 'debug';
import { PairsService } from '../services/pairs-service';
import createHttpError from 'http-errors';

const log: debug.IDebugger = debug('app:pairs-controller');

export class PairsController {
  private pairsService: PairsService;

  constructor(pairsService: PairsService) {
    this.pairsService = pairsService;
  }

  getPair = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { query } = req;
    if (!validQuery(query)) {
      log('invalid query paramater, required pair');
      throw createHttpError(400, 'query paramater required');
    }
    const pairQuery = query['pair']!.toString();
    const pairs = pairQuery.split('-');
    if (pairs.length < 2) {
      log('pair query paramater incorrect format: ' + pairQuery);
      throw createHttpError(400, 'query paramater format incorrect');
    }
    try {
      const pair = await this.pairsService.getPair(pairs[0], pairs[1]);
      res.status(200);
      res.json({
        pair: pair
      });
    } catch (e) {
      log(`getPairs failed with an error: ${e}`);
      next(e);
    }
  };
}

function validQuery(params: any): boolean {
  const pair = params['pair'];
  return pair != null && pair.length > 0;
}
